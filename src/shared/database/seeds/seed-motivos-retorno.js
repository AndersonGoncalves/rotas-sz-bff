const BASE_URL = 'http://localhost:3001/motivos-retorno';

const motivosRetorno = [
  { id: '-OXy64zwZRcF4ohaSEGA', descricao: '00-SEM CONTATO' },
  { id: '-OYbrvdYHh43mhYOtvG5', descricao: '01-NÃO PEDIU O ATENDIMENTO' },
  { id: '-OYbsKVb76rXOOP1nFxm', descricao: '02-PRODUTO ERRADO' },
  { id: '-OYbsQXDaQDIL-y19bnk', descricao: '03-CLT REAGENDOU' },
  { id: '-OYbsU1NMYzeXeKPzggR', descricao: '04-CLT CANCELOU' },
  { id: '-OYbsjZ-wTXhRhOfdVHF', descricao: '05-NÃO DEU TEMPO' },
  { id: '-OYbsnDHnM1U6cJr-9SM', descricao: '06-RESTRIÇÃO DE HORÁRIO' },
  { id: '-OYbwL9r0r8MCUMDB1Yq', descricao: '07-ENDEREÇO NÃO LOCALIZADO' },
  { id: '-OYbwOQk8zilDGLyiZ9W', descricao: '08-FORA DE ROTA' },
  { id: '-OYbwcYJHINx7lLOt3eH', descricao: '09-PEDIDO DUPLICADO' },
  { id: '-OYbwgXYWxOie3jN1VaW', descricao: '10-ROTA EXTRA' },
  { id: '-OYbwkF6TblvuUkDDdF8', descricao: '11-SEM AUTORIZAÇÃO' },
  { id: '-OYbwnh7bJ3mbtaR9t1s', descricao: '12-LIMITE DE ESPERA' },
  { id: '-OYbwqYaNqXRPzC9ZTTd', descricao: '13-PRODUTO EM FALTA' },
  { id: '-OYbwtWa-lDS7iUHIYSU', descricao: '14-OUTROS MOTIVOS' },
  { id: '-OYbwwZU86M17xq2Z7-w', descricao: '16-CASA FECHADA' },
  { id: '-OYbx3ToaVN0_7IfmnKQ', descricao: '15-RESGATEZON' },
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
  console.log(`Enviando ${motivosRetorno.length} motivos de retorno para ${BASE_URL}\n`);
  const results = await Promise.all(motivosRetorno.map((m, i) => post(m, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${motivosRetorno.length} inseridos com sucesso.`);
}

main();
