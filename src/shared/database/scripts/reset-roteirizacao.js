// Zera os campos derivados de roteirização (origemRoteirizacao,
// destinoRoteirizacao, origemDiaRoteirizacao, horarioPrevistoAtendimento,
// distanciaPercorridaMetros, duracaoPercorridaSegundos) dos pedidos de uma
// data/técnico — pra testar "Calcular melhor rota" do zero, sem carregar
// valores de uma roteirização anterior (ex.: uma origem que ficou
// "contaminada" por um atendimento fora de ordem antes da correção do
// campo origemDiaRoteirizacao existir).
//
// NÃO mexe em situacaoRomaneio, horarioInicioReal, horarioFimReal nem
// index — isso é progresso real do técnico, não dado de roteirização.
//
// Uso:
//   node reset-roteirizacao.js [url] [YYYY-MM-DD] [codigoTecnico] [--dry-run]
//
// Exemplos:
//   node reset-roteirizacao.js http://localhost:3001 2026-08-28 123 --dry-run
//   node reset-roteirizacao.js http://localhost:3001 2026-08-28 123

const rawArgs = process.argv.slice(2).filter(Boolean);
const dryRun = rawArgs.includes('--dry-run');
const args = rawArgs.filter((a) => a !== '--dry-run');

const urlArg = args.find((a) => a.startsWith('http')) || 'http://localhost:3001';
const dataArg = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const tecnicoArg = args.find((a) => a !== urlArg && a !== dataArg);

if (!dataArg) {
  console.error('Uso: node reset-roteirizacao.js [url] <YYYY-MM-DD> [codigoTecnico] [--dry-run]');
  process.exit(1);
}

const BASE_URL = `${urlArg}/pedido`;
const [year, month, day] = dataArg.split('-').map((n) => parseInt(n, 10));

const CAMPOS_RESETADOS = {
  origemRoteirizacao: null,
  destinoRoteirizacao: null,
  origemDiaRoteirizacao: null,
  horarioPrevistoAtendimento: null,
  distanciaPercorridaMetros: null,
  duracaoPercorridaSegundos: null,
};

async function buscarPedidos() {
  const query = new URLSearchParams({ year: String(year), month: String(month), day: String(day) });
  if (tecnicoArg) query.set('tecnico', tecnicoArg);
  const res = await fetch(`${BASE_URL}?${query}`);
  if (!res.ok) throw new Error(`GET /pedido falhou: ${res.status}`);
  return res.json();
}

async function resetarPedido(pedido) {
  const res = await fetch(`${BASE_URL}/${pedido.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(CAMPOS_RESETADOS),
  });
  if (!res.ok) throw new Error(`PATCH /pedido/${pedido.id} falhou: ${res.status}`);
}

async function main() {
  const pedidos = await buscarPedidos();
  if (pedidos.length === 0) {
    console.log(`Nenhum pedido encontrado para ${dataArg}${tecnicoArg ? ` / técnico ${tecnicoArg}` : ''}.`);
    return;
  }

  console.log(`${pedidos.length} pedido(s) encontrado(s):`);
  for (const p of pedidos) {
    console.log(
      `  - [${p.index ?? '-'}] ${p.codigoExterno || p.id} — ${p.situacaoRomaneio} — origemRoteirizacao=${p.origemRoteirizacao ?? 'null'} origemDiaRoteirizacao=${p.origemDiaRoteirizacao ?? 'null'}`,
    );
  }

  if (dryRun) {
    console.log('\n[dry-run] Nenhuma alteração foi feita. Rode sem --dry-run para aplicar.');
    return;
  }

  let ok = 0;
  let falhas = 0;
  for (const p of pedidos) {
    try {
      await resetarPedido(p);
      ok++;
    } catch (e) {
      falhas++;
      console.error(`Erro ao resetar pedido ${p.id}:`, e.message);
    }
  }

  console.log(`\nConcluído: ${ok} pedido(s) resetado(s), ${falhas} falha(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
