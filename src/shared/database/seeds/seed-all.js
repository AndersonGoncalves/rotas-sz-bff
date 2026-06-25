const { spawnSync } = require('child_process');
const path = require('path');

const dataArg = process.argv[2] || null;
const urlArg = process.argv[3] || null;

// Seeds que aceitam data opcional como argumento (data=argv[2], url=argv[3])
const seedsComData = ['seed-pedidos.js', 'seed-produtos-entregue.js', 'seed-produtos-recebido.js'];

// Seeds que não possuem argumento de data (url=argv[2])
const seedsSemData = [
  'seed-pendencias.js',
  'seed-checklist-assistencia.js',
  'seed-checklist-assistencia-agua-natural.js',
  'seed-funcionarios.js',
  'seed-motivos-retorno.js',
  'seed-motivos-situacao.js',
];

function run(seed, args = []) {
  const separator = '='.repeat(52);
  console.log(`\n${separator}`);
  console.log(` ${seed}`);
  console.log(separator);

  const result = spawnSync('node', [path.join(__dirname, seed), ...args], { stdio: 'inherit' });

  if (result.status !== 0) {
    console.error(`\n[!] ${seed} encerrou com erro. Continuando para o próximo.\n`);
  }
}

if (dataArg) {
  console.log(`Data romaneio override: ${dataArg}`);
} else {
  console.log('Sem override de data — usando as datas dos arquivos JSON.');
}
if (urlArg) {
  console.log(`URL override         : ${urlArg}`);
}
console.log();

for (const seed of seedsComData) {
  const args = urlArg ? [dataArg || '', urlArg] : (dataArg ? [dataArg] : []);
  run(seed, args);
}

for (const seed of seedsSemData) {
  run(seed, urlArg ? [urlArg] : []);
}

console.log('\nTodos os seeds concluídos com sucesso.');
