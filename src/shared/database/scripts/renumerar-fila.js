// Renumera sequencialmente (1, 2, 3...) os pedidos "EM ABERTO"/"ATENDIMENTO"
// de uma data/técnico, na ordem atual do `index` (empate por id) — corrige
// colisões de índice causadas por "Calcular melhor rota"/reordenação manual
// terem rodado enquanto algum pedido estava "Em Atendimento" (essas rotinas
// só reindexam pedidos "Em Aberto", então recomeçavam a numeração do 1 sem
// saber que um índice já estava ocupado por um atendimento em andamento —
// corrigido no app, mas isso não desfaz colisões já gravadas no banco).
//
// NÃO mexe em pedidos "FINALIZADO" (mantêm o índice histórico) nem em
// nenhum outro campo além de `index`.
//
// Uso:
//   node renumerar-fila.js [url] [YYYY-MM-DD] [codigoTecnico] [--dry-run]
//
// Exemplos:
//   node renumerar-fila.js http://localhost:3001 2026-08-28 886 --dry-run
//   node renumerar-fila.js http://localhost:3001 2026-08-28 886

const rawArgs = process.argv.slice(2).filter(Boolean);
const dryRun = rawArgs.includes('--dry-run');
const args = rawArgs.filter((a) => a !== '--dry-run');

const urlArg = args.find((a) => a.startsWith('http')) || 'http://localhost:3001';
const dataArg = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const tecnicoArg = args.find((a) => a !== urlArg && a !== dataArg);

if (!dataArg) {
  console.error('Uso: node renumerar-fila.js [url] <YYYY-MM-DD> [codigoTecnico] [--dry-run]');
  process.exit(1);
}

const BASE_URL = `${urlArg}/pedido`;
const [year, month, day] = dataArg.split('-').map((n) => parseInt(n, 10));

const SITUACOES_RENUMERADAS = new Set(['EM ABERTO', 'ATENDIMENTO']);

async function buscarPedidos() {
  const query = new URLSearchParams({ year: String(year), month: String(month), day: String(day) });
  if (tecnicoArg) query.set('tecnico', tecnicoArg);
  const res = await fetch(`${BASE_URL}?${query}`);
  if (!res.ok) throw new Error(`GET /pedido falhou: ${res.status}`);
  return res.json();
}

async function atualizarIndex(pedido, novoIndex) {
  const res = await fetch(`${BASE_URL}/${pedido.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index: novoIndex }),
  });
  if (!res.ok) throw new Error(`PATCH /pedido/${pedido.id} falhou: ${res.status}`);
}

async function main() {
  const todos = await buscarPedidos();
  const pedidos = todos
    .filter((p) => SITUACOES_RENUMERADAS.has(p.situacaoRomaneio))
    .sort((a, b) => (a.index ?? Infinity) - (b.index ?? Infinity) || a.id.localeCompare(b.id));

  if (pedidos.length === 0) {
    console.log(`Nenhum pedido "EM ABERTO"/"ATENDIMENTO" encontrado para ${dataArg}${tecnicoArg ? ` / técnico ${tecnicoArg}` : ''}.`);
    return;
  }

  const indices = todos.map((p) => p.index).filter((i) => i != null);
  const colisoes = indices.length !== new Set(indices).size;

  console.log(`${pedidos.length} pedido(s) "EM ABERTO"/"ATENDIMENTO" — ${colisoes ? 'COLISÃO DE ÍNDICE DETECTADA' : 'sem colisão detectada'}:`);
  pedidos.forEach((p, i) => {
    const novoIndex = i + 1;
    const marca = p.index !== novoIndex ? '  <- muda' : '';
    console.log(`  [${p.index ?? '-'} -> ${novoIndex}] ${p.codigoExterno || p.id} — ${p.situacaoRomaneio}${marca}`);
  });

  if (dryRun) {
    console.log('\n[dry-run] Nenhuma alteração foi feita. Rode sem --dry-run para aplicar.');
    return;
  }

  let ok = 0;
  let falhas = 0;
  for (let i = 0; i < pedidos.length; i++) {
    const novoIndex = i + 1;
    if (pedidos[i].index === novoIndex) continue;
    try {
      await atualizarIndex(pedidos[i], novoIndex);
      ok++;
    } catch (e) {
      falhas++;
      console.error(`Erro ao renumerar pedido ${pedidos[i].id}:`, e.message);
    }
  }

  console.log(`\nConcluído: ${ok} pedido(s) renumerado(s), ${falhas} falha(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
