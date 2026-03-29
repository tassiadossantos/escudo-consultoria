// Exemplo de script de stress test para API usando autocannon

const autocannon = require('autocannon');

const url = process.env.API_URL || 'http://localhost:3000/api/leads';

autocannon({
  url,
  connections: 50, // número de conexões simultâneas
  duration: 30,    // duração do teste em segundos
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'Teste',
    email: 'teste@exemplo.com',
    consent: true
  })
}, (err, result) => {
  if (err) throw err;
  console.log(autocannon.printResult(result));
});
