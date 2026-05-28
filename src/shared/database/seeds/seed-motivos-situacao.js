const BASE_URL = 'http://localhost:3001/motivos-situacao';

const motivosSituacao = [
  { id: '-ORObL4q1LXZacWr1l6F', descricao: 'Responsável não estava' },
  { id: '-ORObTlt4CCumRPWLBr3', descricao: 'Sem condições financeiras' },
  { id: '-ORuzea4OGWkLPf1akZD', descricao: 'Local de instalação não finalizado' },
  { id: '-ORuzhwyZiSyQSvYTlFf', descricao: 'Cliente Recusou o Teste' },
  { id: '-ORuzoKo1cUjXZv1pWNc', descricao: 'Endereço não localizado' },
];

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
  console.log(`Enviando ${motivosSituacao.length} motivos de situação para ${BASE_URL}\n`);
  const results = await Promise.all(motivosSituacao.map((m, i) => post(m, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${motivosSituacao.length} inseridos com sucesso.`);
}

main();
