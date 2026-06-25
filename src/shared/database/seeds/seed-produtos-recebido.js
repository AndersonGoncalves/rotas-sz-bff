const fs = require('fs');
const path = require('path');

const urlArg = process.argv[3] || 'http://localhost:3001';
const BASE_URL = `${urlArg}/produtos_recebido`;

const dataArg = process.argv[2] || null;
const dataRomaneioOverride = dataArg ? `${dataArg}T00:00:00.000` : null;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-produtos_recebido-export.json');

function extractItems() {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  return Object.entries(raw).map(([key, item]) => ({ ...item, id: item.id || key }));
}

async function filterExisting(items) {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) return items;
    const existing = await res.json();
    const existingKeys = new Set(
      (Array.isArray(existing) ? existing : []).map(
        (e) => `${(e.dataRomaneio || '').substring(0, 10)}|${e.codigoTecnico}`,
      ),
    );
    const dataKey = (item) =>
      `${(dataRomaneioOverride || item.dataRomaneio || '').substring(0, 10)}|${item.codigoTecnico}`;
    const novos = items.filter((item) => !existingKeys.has(dataKey(item)));
    if (novos.length < items.length) {
      console.log(`[i] ${items.length - novos.length} já existente(s) ignorado(s).`);
    }
    return novos;
  } catch {
    return items;
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
    console.log(`[${String(index + 1).padStart(3, '0')}] ${status} ${res.status} — id: ${item.id} | tecnico: ${item.codigoTecnico}`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(3, '0')}] ✗ ERRO — id: ${item.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const all = extractItems();
  const items = await filterExisting(all);
  if (items.length === 0) {
    console.log('Nenhum produto recebido novo para inserir.');
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
  console.log(`Registros: ${items.length}\n`);

  const results = await Promise.all(items.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
}

main();
