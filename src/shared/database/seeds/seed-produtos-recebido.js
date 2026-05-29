const BASE_URL = 'http://localhost:3001/produtos-recebido';

const dataArg = process.argv[2];

if (!dataArg) {
  console.error('Uso: node seed-produtos-recebido.js <data>');
  console.error('Exemplo: node seed-produtos-recebido.js 2026-05-30');
  process.exit(1);
}

const dataRomaneioOverride = `${dataArg}T00:00:00.000`;

const produtosRecebido = [
  { id: '1',  codigoTecnico: '1221' },
  { id: '2',  codigoTecnico: '886'  },
  { id: '3',  codigoTecnico: '1852' },
  { id: '4',  codigoTecnico: '1894' },
  { id: '5',  codigoTecnico: '1879' },
  { id: '6',  codigoTecnico: '1866' },
  { id: '7',  codigoTecnico: '2023' },
  { id: '8',  codigoTecnico: '1924' },
  { id: '9',  codigoTecnico: '286'  },
  { id: '10', codigoTecnico: '1976' },
];

async function prepareRun() {
  let items = [];
  try {
    const res = await fetch(BASE_URL);
    if (res.ok) {
      const data = await res.json();
      items = Array.isArray(data) ? data : [];
    }
  } catch { /* API inacessível — prossegue com ID 1 */ }

  const existentes = items.filter(item => (item.dataRomaneio || '').startsWith(dataArg));
  if (existentes.length > 0) {
    console.error(`[!] Já existem ${existentes.length} registro(s) com dataRomaneio ${dataArg}. Abortando.`);
    process.exit(1);
  }

  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map(item => parseInt(item.id, 10) || 0));
  return isFinite(maxId) ? maxId + 1 : 1;
}

async function post(item, index) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, codigoTecnico: item.codigoTecnico, dataRomaneio: dataRomaneioOverride }),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(3, '0')}] ${status} ${res.status} — id: ${item.id} | tecnico: ${item.codigoTecnico}`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(3, '0')}] ✗ ERRO — id: ${item.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const startId = await prepareRun();
  const items = produtosRecebido.map((item, i) => ({ ...item, id: String(startId + i) }));
  const lastId = startId + items.length - 1;

  console.log(`Data romaneio : ${dataRomaneioOverride}`);
  console.log(`IDs gerados   : ${startId} → ${lastId}  (${items.length} registros)`);
  console.log(`Próximo ID    : ${lastId + 1}\n`);

  const results = await Promise.all(items.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
  console.log(`Próximo idInicial para a próxima execução: ${lastId + 1}`);
}

main();
