const { spawnSync } = require('child_process');
const path = require('path');

const dataArg = process.argv[2];

if (!dataArg) {
  console.error('Uso: node seed-all.js <data>');
  console.error('Exemplo: node seed-all.js 2026-05-30');
  process.exit(1);
}

const seeds = [
  'seed-pedidos.js',
  'seed-produtos-entregue.js',
  'seed-produtos-recebido.js',
];

for (const seed of seeds) {
  const separator = '='.repeat(52);
  console.log(`\n${separator}`);
  console.log(` ${seed}`);
  console.log(separator);

  const result = spawnSync('node', [path.join(__dirname, seed), dataArg], { stdio: 'inherit' });

  if (result.status !== 0) {
    console.error(`\n[!] ${seed} encerrou com erro. Interrompendo.`);
    process.exit(result.status || 1);
  }
}

console.log('\nTodos os seeds concluídos com sucesso.');
