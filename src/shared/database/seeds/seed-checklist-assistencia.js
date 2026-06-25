const fs = require('fs');
const path = require('path');

const urlArg = process.argv[2] || 'http://localhost:3001';
const BASE_URL = `${urlArg}/checklist_assistencia`;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-checklist_assistencia-export.json');

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
      (Array.isArray(existing) ? existing : []).map((e) => `${e.pedidoId}|${e.numeroSerie}`),
    );
    const novos = items.filter((item) => !existingKeys.has(`${item.pedidoId}|${item.numeroSerie}`));
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
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(3, '0')}] ${status} ${res.status} — ${item.id} | ${item.nomeCliente.substring(0, 28)} (${item.pedidoId})`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(3, '0')}] ✗ ERRO — ${item.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const all = extractItems();
  const items = await filterExisting(all);
  if (items.length === 0) {
    console.log('Nenhum checklist de assistência novo para inserir.');
    return;
  }
  console.log(`Enviando ${items.length} checklist(s) de assistência para ${BASE_URL}\n`);
  const results = await Promise.all(items.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
}

main();
