const fs = require('fs');
const path = require('path');

const urlArg = process.argv[2] || 'http://localhost:3001';
const BASE_URL = `${urlArg}/checklist-assistencia-agua-natural`;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-checklist_assistencia_agua_natural-export.json');

function extractItems() {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  return Object.entries(raw).map(([key, item]) => ({ ...item, id: item.id || key }));
}

async function post(item, index) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — ${item.id} | ${item.nomeCliente} (${item.pedidoId})`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — ${item.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const items = extractItems();
  console.log(`Enviando ${items.length} checklists de assistência água natural para ${BASE_URL}\n`);
  const results = await Promise.all(items.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
}

main();
