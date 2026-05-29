const BASE_URL = 'http://localhost:3001/produtos-entregue';

const produtosEntregue = [
  { id: '-OtkLp0Ciswavy27zBvi', codigoTecnico: '1221', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkLr5x2juSiLCVWObh', codigoTecnico: '886',  dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkLtGCERen-jxgvNUl', codigoTecnico: '1852', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkLv__iHGIsGCHPyP7', codigoTecnico: '1894', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkLxWSGw4ZfMemLVYL', codigoTecnico: '1879', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkLzNvBTggrZIVLc4C', codigoTecnico: '1866', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkM0_0hr1XzzVluQdg', codigoTecnico: '2023', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkM2fc9RTA7hB5BdA8', codigoTecnico: '1924', dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkM4eKkUBEJsinDH2l', codigoTecnico: '286',  dataRomaneio: '2026-05-29T00:00:00.000' },
  { id: '-OtkM6SjCL7aF5_XKykH', codigoTecnico: '1976', dataRomaneio: '2026-05-29T00:00:00.000' },
];

async function post(item, index) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, codigoTecnico: item.codigoTecnico, dataRomaneio: item.dataRomaneio }),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — ${item.id} (${item.codigoTecnico})`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — ${item.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Enviando ${produtosEntregue.length} produtos entregues para ${BASE_URL}\n`);
  const results = await Promise.all(produtosEntregue.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${produtosEntregue.length} inseridos com sucesso.`);
}

main();
