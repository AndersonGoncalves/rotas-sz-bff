#!/usr/bin/env node

/**
 * Exclui pedidos do MongoDB filtrando por dataRomaneio.
 * Requer o container Docker do MongoDB rodando (docker compose up -d).
 *
 * Uso:
 *   node scripts/excluirPedidosPorData.js "2026-06-08T00:00:00.000"                              exatamente esta data (usa .env)
 *   node scripts/excluirPedidosPorData.js "2026-06-08T00:00:00.000" --antes                      estritamente anteriores à data
 *   node scripts/excluirPedidosPorData.js "2026-06-08T00:00:00.000" --ate                        menores ou iguais à data
 *   node scripts/excluirPedidosPorData.js "2026-06-08T00:00:00.000" --dry-run                    simula sem apagar
 *   node scripts/excluirPedidosPorData.js "2026-06-08T00:00:00.000" --url "mongodb://..."        banco específico
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// --- Configuração ---
const ENV_PATH = path.join(__dirname, '../.env');
const COLLECTION = 'pedido';

function carregarEnv() {
  if (!fs.existsSync(ENV_PATH)) {
    console.error(`Arquivo .env não encontrado em: ${ENV_PATH}`);
    process.exit(1);
  }
  return Object.fromEntries(
    fs.readFileSync(ENV_PATH, 'utf-8')
      .split('\n')
      .filter((l) => l.includes('=') && !l.startsWith('#'))
      .map((l) => {
        const idx = l.indexOf('=');
        return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
      }),
  );
}

function buildMongoUrl(env, urlArg) {
  if (urlArg) return urlArg;
  const url = env.DB_URL;
  if (!url) {
    console.error('Variável DB_URL não encontrada no .env');
    process.exit(1);
  }
  // Troca o hostname "mongo" (Docker) por "localhost" para rodar fora do container
  return url.replace('@mongo:', '@localhost:');
}

// --- Args ---
function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Erro: informe a data. Ex: node scripts/excluirPedidosPorData.js "2026-06-08T00:00:00.000"');
    process.exit(1);
  }

  const dataAlvo = args[0];
  const modoAte = args.includes('--ate');
  const modoAntes = args.includes('--antes');
  const dryRun = args.includes('--dry-run');

  const urlIdx = args.indexOf('--url');
  const urlArg = urlIdx !== -1 ? args[urlIdx + 1] : null;

  if (modoAte && modoAntes) {
    console.error('Erro: use apenas um modo: --ate ou --antes.');
    process.exit(1);
  }

  if (isNaN(Date.parse(dataAlvo))) {
    console.error(`Erro: data inválida "${dataAlvo}". Use o formato ISO, ex: "2026-06-08T00:00:00.000"`);
    process.exit(1);
  }

  if (urlIdx !== -1 && !urlArg) {
    console.error('Erro: --url requer um valor. Ex: --url "mongodb://user:pass@host:27017/dbname"');
    process.exit(1);
  }

  return { dataAlvo, modoAte, modoAntes, dryRun, urlArg };
}

// --- Filtro MongoDB ---
// dataRomaneio é String ISO — comparação lexicográfica funciona para datas ISO
function buildFiltro(dataAlvo, modoAte, modoAntes) {
  const dataParte = dataAlvo.substring(0, 10); // "2026-06-08"

  if (modoAntes) {
    // dataRomaneio < "2026-06-08" (strings ISO: "2026-06-07T..." < "2026-06-08")
    return { dataRomaneio: { $lt: dataParte } };
  }

  if (modoAte) {
    // dataRomaneio <= "2026-06-08T..." → tudo antes do próximo dia
    const nextDay = new Date(dataParte);
    nextDay.setDate(nextDay.getDate() + 1);
    return { dataRomaneio: { $lt: nextDay.toISOString().substring(0, 10) } };
  }

  // Exato: dataRomaneio começa com "2026-06-08" (cobre T00:00:00 e T00:00:00.000)
  return { dataRomaneio: { $regex: `^${dataParte}` } };
}

// --- Mongosh helpers ---
function mongoEval(mongoUrl, script) {
  const tmpFile = path.join('/tmp', `mongo_script_${Date.now()}.js`);
  try {
    fs.writeFileSync(tmpFile, script);
    const output = execSync(`mongosh "${mongoUrl}" --quiet --file "${tmpFile}"`, {
      encoding: 'utf-8',
      maxBuffer: 100 * 1024 * 1024,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return output.trim();
  } catch (err) {
    throw new Error(err.stderr || err.message);
  } finally {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
  }
}

function buscarPedidos(mongoUrl, filtro) {
  console.log(`Buscando pedidos na coleção "${COLLECTION}"...`);
  const script = `
    const filtro = ${JSON.stringify(filtro)};
    const docs = db.getCollection('${COLLECTION}')
      .find(filtro, { _id: 1, dataRomaneio: 1 })
      .sort({ dataRomaneio: 1 })
      .toArray();
    print(JSON.stringify(docs));
  `;
  try {
    const raw = mongoEval(mongoUrl, script);
    // mongosh pode emitir linhas extras; pega só a linha que parece JSON array
    const jsonLine = raw.split('\n').find((l) => l.trim().startsWith('['));
    return jsonLine ? JSON.parse(jsonLine) : [];
  } catch (err) {
    console.error('Erro ao buscar pedidos no MongoDB:');
    console.error(err.message);
    process.exit(1);
  }
}

function excluirPedidos(mongoUrl, filtro) {
  const script = `
    const filtro = ${JSON.stringify(filtro)};
    const resultado = db.getCollection('${COLLECTION}').deleteMany(filtro);
    print(JSON.stringify({ deletedCount: resultado.deletedCount }));
  `;
  try {
    const raw = mongoEval(mongoUrl, script);
    const jsonLine = raw.split('\n').find((l) => l.trim().startsWith('{'));
    return jsonLine ? JSON.parse(jsonLine) : { deletedCount: 0 };
  } catch (err) {
    console.error('Erro ao excluir pedidos no MongoDB:');
    console.error(err.message);
    process.exit(1);
  }
}

// --- Labels de data ---
function labelData(dataRomaneio) {
  const soData = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const hoje = soData(new Date());
  const ts = soData(new Date(dataRomaneio));
  const diff = (ts - hoje) / (1000 * 60 * 60 * 24);
  if (diff === -1) return '(ontem)';
  if (diff === 0) return '(hoje)';
  if (diff === 1) return '(amanhã)';
  return '';
}

function descricaoModo(modoAte, modoAntes) {
  if (modoAntes) return 'anteriores à data (--antes)  →  dataRomaneio < data';
  if (modoAte) return 'até esta data (--ate)         →  dataRomaneio <= data';
  return 'exatamente esta data          →  dataRomaneio == data';
}

function operadorModo(modoAte, modoAntes) {
  if (modoAntes) return '<';
  if (modoAte) return '<=';
  return '==';
}

// --- Main ---
function main() {
  const { dataAlvo, modoAte, modoAntes, dryRun, urlArg } = parseArgs();

  const env = urlArg ? {} : carregarEnv();
  const mongoUrl = buildMongoUrl(env, urlArg);
  const filtro = buildFiltro(dataAlvo, modoAte, modoAntes);

  console.log('');
  console.log(`Data alvo : ${dataAlvo}`);
  console.log(`Modo      : ${descricaoModo(modoAte, modoAntes)}`);
  console.log(`Dry-run   : ${dryRun ? 'SIM (nenhum dado será apagado)' : 'NÃO'}`);
  console.log('');

  const pedidos = buscarPedidos(mongoUrl, filtro);

  if (pedidos.length === 0) {
    console.log(`Nenhum pedido encontrado com dataRomaneio ${operadorModo(modoAte, modoAntes)} "${dataAlvo}".`);
    return;
  }

  console.log(`${pedidos.length} pedido(s) encontrado(s):`);
  pedidos.forEach((p) => {
    const label = labelData(p.dataRomaneio);
    console.log(`  - ID: ${p._id}  |  dataRomaneio: ${p.dataRomaneio} ${label}`);
  });
  console.log('');

  if (dryRun) {
    console.log('[DRY-RUN] Nenhum dado foi apagado. Remova --dry-run para excluir de verdade.');
    return;
  }

  const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  readline.question(
    `Confirma a exclusão de ${pedidos.length} pedido(s) com dataRomaneio ${operadorModo(modoAte, modoAntes)} "${dataAlvo}"? (s/N) `,
    (resposta) => {
      readline.close();
      if (resposta.toLowerCase() !== 's') {
        console.log('Operação cancelada.');
        return;
      }
      console.log('Excluindo...');
      const resultado = excluirPedidos(mongoUrl, filtro);
      console.log(`\nConcluído. ${resultado.deletedCount} pedido(s) excluído(s).`);
    },
  );
}

main();
