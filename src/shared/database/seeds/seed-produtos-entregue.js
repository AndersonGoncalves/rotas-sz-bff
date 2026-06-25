const fs = require('fs');
const path = require('path');

const urlArg = process.argv[3] || 'http://localhost:3001';
const BASE_URL = `${urlArg}/produtos_entregue`;

const dataArg = process.argv[2] || null;
const dataRomaneioOverride = dataArg ? `${dataArg}T00:00:00.000` : null;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-produtos_entregue-export.json');

function extractItems() {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  return Object.entries(raw).map(([key, item]) => ({ ...item, id: item.id || key }));
}

async function checkDuplicates(items) {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) return;
    const existing = await res.json();
    const list = Array.isArray(existing) ? existing : [];

    const datasParaChecar = dataArg
      ? [dataArg]
      : [...new Set(items.map((p) => (p.dataRomaneio || '').substring(0, 10)).filter(Boolean))];

    for (const dt of datasParaChecar) {
      const existentes = list.filter((item) => (item.dataRomaneio || '').startsWith(dt));
      if (existentes.length > 0) {
        console.error(
          `[!] Já existem ${existentes.length} registro(s) com dataRomaneio ${dt}. Abortando.`,
        );
        process.exit(1);
      }
    }
  } catch {
    /* API inacessível — prossegue */
  }
}

async function post(item, index) {
  try {
    const payload = dataRomaneioOverride ? { ...item, dataRomaneio: dataRomaneioOverride } : { ...item };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — id: ${item.id} | tecnico: ${item.codigoTecnico}`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — id: ${item.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const items = extractItems();
  await checkDuplicates(items);

  if (dataRomaneioOverride) {
    console.log(`Data romaneio : ${dataRomaneioOverride}`);
  } else {
    const datas = [
      ...new Set(items.map((p) => (p.dataRomaneio || '').substring(0, 10)).filter(Boolean)),
    ];
    console.log(`Datas romaneio: ${datas.join(', ')}`);
  }
  console.log(`Registros: ${items.length}\n`);

  const results = await Promise.all(items.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
}

main();
