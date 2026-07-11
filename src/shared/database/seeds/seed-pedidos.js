const fs = require('fs');
const path = require('path');

// Aceita data e url em qualquer ordem — o PowerShell pode descartar "" ao repassar argumentos.
const rawArgs = process.argv.slice(2).filter(Boolean);
const urlArg = rawArgs.find((a) => a.startsWith('http')) || 'http://localhost:3001';
const dataArg = rawArgs.find((a) => a !== urlArg) || null;

const BASE_URL = `${urlArg}/pedido`;

const dataRomaneioOverride = dataArg ? `${dataArg}T00:00:00.000` : null;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-pedido-export.json');

// Firebase exporta { "976858": { ...dados }, "977184": { ...dados }, ... }
function extractPedidos() {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  return Object.entries(raw).map(([key, pedido]) => ({ ...pedido, id: pedido.id || key }));
}

async function findDatasBloqueadas(items) {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) return new Set();
    const existing = await res.json();
    const list = Array.isArray(existing) ? existing : [];

    const datasParaChecar = dataArg
      ? [dataArg]
      : [...new Set(items.map((p) => (p.dataRomaneio || '').substring(0, 10)).filter(Boolean))];

    const bloqueadas = new Set();
    for (const dt of datasParaChecar) {
      const existentes = list.filter((item) => (item.dataRomaneio || '').startsWith(dt));
      if (existentes.length > 0) {
        console.log(`[i] Já existem ${existentes.length} pedido(s) com dataRomaneio ${dt}. Pulando essa data.`);
        bloqueadas.add(dt);
      }
    }
    return bloqueadas;
  } catch {
    return new Set();
  }
}

async function put(pedido, index) {
  try {
    const payload = dataRomaneioOverride
      ? { ...pedido, dataRomaneio: dataRomaneioOverride, dataVisita: dataRomaneioOverride }
      : { ...pedido };
    const res = await fetch(`${BASE_URL}/${pedido.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(
      `[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — ${pedido.id} | ${pedido.nomeCliente.substring(0, 28)} (${pedido.situacaoRomaneio})`,
    );
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — ${pedido.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const all = extractPedidos();
  const datasBloqueadas = await findDatasBloqueadas(all);

  const items = dataArg
    ? (datasBloqueadas.has(dataArg) ? [] : all)
    : all.filter((p) => !datasBloqueadas.has((p.dataRomaneio || '').substring(0, 10)));

  if (items.length === 0) {
    console.log('\nNenhum pedido novo para inserir (todas as datas já existem).');
    return;
  }

  if (dataRomaneioOverride) {
    console.log(`Data romaneio : ${dataRomaneioOverride}`);
  } else {
    const datas = [
      ...new Set(items.map((p) => (p.dataRomaneio || '').substring(0, 10)).filter(Boolean)),
    ];
    console.log(`Datas romaneio: ${datas.join(', ')}`);
  }
  console.log(
    `Pedidos: ${items.length}/${all.length}${all.length - items.length > 0 ? ` (${all.length - items.length} pulado(s) por data já existente)` : ''}\n`,
  );

  const results = await Promise.all(items.map((p, i) => put(p, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
}

main();
