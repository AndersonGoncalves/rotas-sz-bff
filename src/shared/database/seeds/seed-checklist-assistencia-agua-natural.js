const BASE_URL = 'http://localhost:3001/checklist-assistencia-agua-natural';

const checklists = [
  {
    id: '-OtFBqx7yGLyAT7NLB07',
    pedidoId: '972585',
    codigoCliente: '74820',
    idCliente: '74820',
    nomeCliente: 'Wesson Monteiro Nobrega',
    numeroSerie: '972585 wesson ',
    modelo: 'prime branco amarela',
    dataChecklist: '2026-05-22T11:58:53.918809',
    descricaoDoDefeito: 'revisão geral. ',
    maisInformacoes: 'orçamento.',
    adesivoDesgastado: false,
    amarelado: true,
    rabicho: true,
    torneira: true,
    trincado: false,
    volante: false,
  },
  {
    id: '-Ote98a8Fhs-RNCOed4q',
    pedidoId: '974110',
    codigoCliente: '133649',
    idCliente: '133649',
    nomeCliente: 'Marcia Cristina Silva',
    numeroSerie: '133649 Marcia ',
    modelo: 'prime branco ',
    dataChecklist: '2026-05-27T12:57:35.426477',
    descricaoDoDefeito: 'revisão geral.',
    maisInformacoes: 'revisão geral ',
    adesivoDesgastado: false,
    amarelado: true,
    rabicho: true,
    torneira: true,
    trincado: false,
    volante: true,
  },
  {
    id: '16052026101646',
    pedidoId: '969508',
    codigoCliente: '54191',
    idCliente: '54191',
    nomeCliente: 'Denisio De Jesus Rodrigues',
    numeroSerie: '54191',
    modelo: 'prime preto',
    dataChecklist: '2026-05-16T10:15:26.529794',
    descricaoDoDefeito: 'sem ozônio e led queimado ',
    maisInformacoes: 'sem ozônio e led queimado',
    adesivoDesgastado: true,
    amarelado: false,
    rabicho: true,
    torneira: true,
    trincado: false,
    volante: true,
  },
  {
    id: '19052026144351',
    pedidoId: '970802',
    codigoCliente: '43427',
    idCliente: '43427',
    nomeCliente: 'Francisca Laura Silva Linhares',
    numeroSerie: '-',
    modelo: 'N/A',
    dataChecklist: '2026-05-19T14:43:30.333007',
    descricaoDoDefeito: 'ozônio queimou ',
    maisInformacoes: 'ozônio queimou ',
    adesivoDesgastado: true,
    amarelado: true,
    rabicho: true,
    torneira: true,
    trincado: false,
    volante: true,
  },
];

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
  console.log(`Enviando ${checklists.length} checklists de assistência água natural para ${BASE_URL}\n`);
  const results = await Promise.all(checklists.map((item, i) => post(item, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${checklists.length} inseridos com sucesso.`);
}

main();
