const fs = require('fs');
const path = require('path');

const urlArg = process.argv[2] || 'http://localhost:3001';
const BASE_URL = `${urlArg}/pendencia`;

const JSON_PATH = path.join(__dirname, 'dados', 'rotas-sz-default-rtdb-pendencia-export.json');

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
      (Array.isArray(existing) ? existing : []).map((e) => `${e.pedidoId}|${e.pendencia}`),
    );
    const novos = items.filter((item) => !existingKeys.has(`${item.pedidoId}|${item.pendencia}`));
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
    const body = {
      id: item.id,
      pedidoId: item.pedidoId,
      codigoCliente: item.codigoCliente,
      idCliente: item.idCliente,
      nomeCliente: item.nomeCliente,
      pendencia: item.pendencia,
      observacao: item.observacao,
      ...(item.idMotivoRetorno ? { idMotivoRetorno: item.idMotivoRetorno } : {}),
      importado: item.importado ?? false,
      ...(item.dataRomaneio ? { dataRomaneio: item.dataRomaneio } : {}),
    };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(3, '0')}] ${status} ${res.status} — ${item.pedidoId} | ${item.nomeCliente.substring(0, 30)} (${item.pendencia})`);
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
    console.log('Nenhuma pendência nova para inserir.');
    return;
  }
  console.log(`Enviando ${items.length} pendência(s) para ${BASE_URL}\n`);
  const results = await Promise.all(items.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridas com sucesso.`);
}

main();
