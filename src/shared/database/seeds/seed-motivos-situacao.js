const fs = require('fs');
const path = require('path');

const urlArg = process.argv[2] || 'http://localhost:3001';
const BASE_URL = `${urlArg}/motivos-situacao`;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-motivoSituacao-export.json');

function extractItems() {
  const raw = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
  return Object.entries(raw).map(([key, item]) => ({ ...item, id: item.id || key }));
}

async function filterExisting(items) {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) return items;
    const existing = await res.json();
    const existingDescricoes = new Set(
      (Array.isArray(existing) ? existing : []).map((e) => String(e.descricao).toLowerCase()),
    );
    const novos = items.filter(
      (item) => !existingDescricoes.has(String(item.descricao).toLowerCase()),
    );
    if (novos.length < items.length) {
      console.log(`[i] ${items.length - novos.length} já existente(s) ignorado(s).`);
    }
    return novos;
  } catch {
    return items;
  }
}

async function post(motivo, index) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(motivo),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — ${motivo.descricao}`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — ${motivo.descricao}: ${err.message}`);
    return false;
  }
}

async function main() {
  const all = extractItems();
  const items = await filterExisting(all);
  if (items.length === 0) {
    console.log('Nenhum motivo de situação novo para inserir.');
    return;
  }
  console.log(`Enviando ${items.length} motivo(s) de situação para ${BASE_URL}\n`);
  const results = await Promise.all(items.map((m, i) => post(m, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
}

main();
