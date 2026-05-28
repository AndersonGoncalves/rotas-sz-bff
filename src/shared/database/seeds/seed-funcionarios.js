const BASE_URL = 'http://localhost:3001/funcionarios';

const funcionarios = [
  { id: '-OYXkLke3BoV8mgGzKJo', funcao: '',           codigoExterno: '1221',  nome: 'Tiago',             email: 'tiago@superzon.com.br',                   foto: '', assinatura: '' },
  { id: '-OZ5vWK7Wq8Sa3TxLcgk', funcao: '',           codigoExterno: '886',   nome: 'Tarciano Magalhães', email: 'tarcianomagalhaes05@gmail.com',            foto: '', assinatura: '' },
  { id: '-OZQOjtiwC78aT1HmAc7', funcao: '',           codigoExterno: '1852',  nome: 'Luiz Felipe',       email: 'Luizfelipe@superzon.com.br',               foto: '', assinatura: '' },
  { id: '-OZQP3J0nEoT_KordHHQ', funcao: 'Técnico',   codigoExterno: '1894',  nome: 'Welton',            email: 'Welton@superzon.com.br',                   foto: '', assinatura: '' },
  { id: '-OZQPkH-iJbz5D90pmUU', funcao: 'Técnico',   codigoExterno: '1712',  nome: 'Cleilson',          email: 'Cleilson@superzon.com.br',                 foto: '', assinatura: '' },
  { id: '-OZQQ43UcM4q8ae-rZQm', funcao: 'Vendedor',  codigoExterno: '1875',  nome: 'Eduardo',           email: 'Eduardo@superzon.com.br',                  foto: '', assinatura: '' },
  { id: '-OZQQgpL7zNgaSmmkxz8', funcao: 'Técnico',   codigoExterno: '1879',  nome: 'Magno',             email: 'Magno@superzon.com.br',                    foto: '', assinatura: '' },
  { id: '-OZV6FfeAUTg3NGEbcPQ', funcao: '',           codigoExterno: '0',     nome: 'Anderson',          email: 'anndersonn.gonncalves@gmail.com',          foto: '', assinatura: '' },
  { id: '-Od0kv1tL_0nPAABZttj', funcao: 'Vendedor',  codigoExterno: '99',    nome: 'Abiathar',          email: '',                                         foto: '', assinatura: '' },
  { id: '-OhB7Bp1judg_L1PoIgm', funcao: 'Gerente',   codigoExterno: '289',   nome: 'Tarciano Filho',    email: 'tarcianofilho334@gmail.com',               foto: '', assinatura: '' },
  { id: '-OhB7aoWVdwmXsacWmTe', funcao: 'Comercial', codigoExterno: '344',   nome: 'Maria Gislayne',    email: 'mariagislaynesuperzon@gmail.com',          foto: '', assinatura: '' },
  { id: '-OhB8INvfFFgLTxscOwO', funcao: 'Comercial', codigoExterno: '356',   nome: 'Sarah Priscyla',    email: 'sarahpriscyla@superzon.com',               foto: '', assinatura: '' },
  { id: '-OhB8ZMmjZI-PbDQQ167', funcao: 'Comercial', codigoExterno: '299',   nome: 'Thailine Rodrigues', email: 'thailinerodrigues@superzon.com',          foto: '', assinatura: '' },
  { id: '-OhB8mdXvMY5KvKIio35', funcao: 'Comercial', codigoExterno: '256',   nome: 'Ana Beatriz',       email: 'anabeatriz@superzon.com',                  foto: '', assinatura: '' },
  { id: '-OhB9A38UGpG7EjLa9-R', funcao: 'Gerente',   codigoExterno: '64',    nome: 'Luana',             email: 'luana@superzon.com.br',                    foto: '', assinatura: '' },
  { id: '-OhB9PeXnGVxKZpYPOJ8', funcao: 'Gerente',   codigoExterno: '49',    nome: 'Samara',            email: 'samaralogi@superzon.com',                  foto: '', assinatura: '' },
  { id: '-OhB9xamUfgYWBuLQ9xa', funcao: 'Financeiro', codigoExterno: '275',  nome: 'Camila Ellen',      email: 'camilaellen@superzon.com.br',              foto: '', assinatura: '' },
  { id: '-OhBB4dXt5apZAHTMhkZ', funcao: 'Estoque',   codigoExterno: '179',   nome: 'Majore',            email: 'majore@superzon.com.br',                   foto: '', assinatura: '' },
  { id: '-OhBD-N5J0LBNkyw-GMv', funcao: 'Logística', codigoExterno: '129',   nome: 'Fabiana',           email: 'fabiana@superzon.com.br',                  foto: '', assinatura: '' },
  { id: '-OhBDEpuFXzKn77fPzEW', funcao: 'Logística', codigoExterno: '333',   nome: 'Mayara Almeida',    email: 'mayaraalmeida@superzon.com.br',            foto: '', assinatura: '' },
  { id: '-OhBEHBajNDLaRX0RX6v', funcao: 'Gerente',   codigoExterno: '310',   nome: 'Cleber William',    email: 'cleber.william@superzon.com',              foto: '', assinatura: '' },
  { id: '-OhBEjbCzwMLKVLv-iz3', funcao: 'Comercial', codigoExterno: '343',   nome: 'Claudia Lacerda',   email: 'claudia.lacerda.superzon@gmail.com',       foto: '', assinatura: '' },
  { id: '-OhBNm4PD_bA8FKxEy6h', funcao: 'Estoque',   codigoExterno: '341',   nome: 'Levi',              email: 'levi@superzon.com',                        foto: '', assinatura: '' },
  { id: '-OixPTO2bDZpka2vWike', funcao: 'Logística', codigoExterno: '66',    nome: 'Aline',             email: 'alinesuperzon21@gmail.com',                foto: '', assinatura: '' },
  { id: '-OkjFpdHmw3FTu-mTDTY', funcao: 'Técnico',   codigoExterno: '1866',  nome: 'Emerson',           email: 'emerson@superzon.com.br',                  foto: '', assinatura: '' },
  { id: '-Ol6_RM6FLqHx89bXS8w', funcao: 'Vendedor',  codigoExterno: '239',   nome: 'ELISETE',           email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6_ckjDGjiuUDsKL9B', funcao: 'Vendedor',  codigoExterno: '269',   nome: 'THANYA',            email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6_mbB0BLvslCpi7Jq', funcao: 'Vendedor',  codigoExterno: '285',   nome: 'SARA',              email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6efKgN5g44qRuhin9', funcao: 'Vendedor',  codigoExterno: '665',   nome: '',                  email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6epJpUho4na_wSJ1F', funcao: 'Vendedor',  codigoExterno: '736',   nome: 'DJAINE',            email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6f-ZnvlLSyLoWbv2t', funcao: 'Vendedor',  codigoExterno: '795',   nome: 'DAYANA',            email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6fP42mjvKZIv1cReP', funcao: 'Vendedor',  codigoExterno: '936',   nome: 'SAMARA LOURENCO',   email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6fVfNHfCt5BrI6i2i', funcao: 'Vendedor',  codigoExterno: '1069',  nome: 'FLAVIANA',          email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6fabIT3BeZr8jNIHw', funcao: 'Vendedor',  codigoExterno: '1071',  nome: 'ANGELICA',          email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6fhpxVv7K4jSRnmRG', funcao: 'Vendedor',  codigoExterno: '1090',  nome: 'ALINE',             email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6frGwGJvlvMfgSmrk', funcao: 'Vendedor',  codigoExterno: '1104',  nome: 'ADRIANI ARAGÃO',    email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6fzqnMlJKV8VBK_hO', funcao: 'Vendedor',  codigoExterno: '1194',  nome: 'MILENA',            email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6g7Ez5Tp2CzPRJocD', funcao: 'Vendedor',  codigoExterno: '1258',  nome: 'THATIANA',          email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6gD6dBzBX5nxKVfoS', funcao: 'Vendedor',  codigoExterno: '1271',  nome: 'TAMYRES',           email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6gLuR0uTPOTcXEqH5', funcao: 'Vendedor',  codigoExterno: '1311',  nome: 'ANDREIA ALVES',     email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6gR2lOzpdKznGPfCI', funcao: 'Vendedor',  codigoExterno: '1313',  nome: 'MONICA',            email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6gaHvlFaXG1oO4esZ', funcao: 'Vendedor',  codigoExterno: '1358',  nome: 'EMANUELLY',         email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6i-C52b_9JV4KuAEt', funcao: 'Vendedor',  codigoExterno: '1359',  nome: 'MANOELLA',          email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6i7M_xai_07p3wHD3', funcao: 'Vendedor',  codigoExterno: '1364',  nome: 'DANIELE',           email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6iD-oDpebCh00xmsM', funcao: 'Vendedor',  codigoExterno: '1402',  nome: 'VANIA',             email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6iKzOn2ZqYE6IlvCQ', funcao: 'Vendedor',  codigoExterno: '1480',  nome: 'SAMARA SANTOS',     email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6iRgpiOQRK1QJxEbg', funcao: 'Gerente',   codigoExterno: '00000', nome: '',                  email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6iXIa1ktqb9alj6QF', funcao: 'Vendedor',  codigoExterno: '1487',  nome: 'NEUSA',             email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6iz_07UmuOH7ad60a', funcao: 'Vendedor',  codigoExterno: '1525',  nome: 'LUANA RICARDO',     email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6j7XtHKAK7SlL2FBA', funcao: 'Vendedor',  codigoExterno: '1584',  nome: 'MARIA BEATRIZ',     email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6jCA8DhQR7swbutRQ', funcao: 'Vendedor',  codigoExterno: '1600',  nome: 'FABIANA',           email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6kacLPCXecw1aLdWA', funcao: 'Vendedor',  codigoExterno: '559',   nome: 'ADRIANA',           email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6ksVseDUaUJh_J6PL', funcao: 'Vendedor',  codigoExterno: '1659',  nome: 'ANDRESSA SILVA',    email: '',                                         foto: '', assinatura: '' },
  { id: '-Ol6l-WY10SJM1cBE1YE', funcao: 'Vendedor',  codigoExterno: '1660',  nome: 'VITORIA',           email: '',                                         foto: '', assinatura: '' },
  { id: '-OnT5pAvmJxyBUMzVBxK', funcao: 'Logística', codigoExterno: '355',   nome: 'Thays Cristina',    email: '',                                         foto: '', assinatura: '' },
  { id: '-Oo1Q_2w97ukGUr2z9BW', funcao: 'Vendedor',  codigoExterno: '1894',  nome: 'Welton',            email: 'Welton@superzon.com.br',                   foto: '', assinatura: '' },
  { id: '-Or-_APHv8g_1UEJIvrH', funcao: 'Técnico',   codigoExterno: '2023',  nome: 'Herberson Barros',  email: 'Herbersonbarros@superzon.com',             foto: '', assinatura: '' },
  { id: '-Or-_oaieVIG57yh5hIm', funcao: 'Técnico',   codigoExterno: '1924',  nome: 'Nielson',           email: 'Nielson@superzon.com',                     foto: '', assinatura: '' },
  { id: '-Or-c5vD2xsxFQDKe4ls', funcao: 'Técnico',   codigoExterno: '286',   nome: 'Maciel',            email: 'Maciel@superzon.com',                      foto: '', assinatura: '' },
  { id: '-Or-hBwUczSVJyxzXhOm', funcao: 'Técnico',   codigoExterno: '1976',  nome: 'Samuel Oliveira',   email: 'Samuel@superzon.com',                      foto: '', assinatura: '' },
];

async function post(funcionario, index) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(funcionario),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — ${funcionario.nome || funcionario.id} (${funcionario.codigoExterno})`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — ${funcionario.nome || funcionario.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Enviando ${funcionarios.length} funcionários para ${BASE_URL}\n`);
  const results = await Promise.all(funcionarios.map((f, i) => post(f, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${funcionarios.length} inseridos com sucesso.`);
}

main();
