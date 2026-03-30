
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/webhook/whatsapp', (req, res) => {
  try {
    // Loga o corpo da requisição de forma robusta
    console.log('Mensagem recebida:', JSON.stringify(req.body, null, 2));
    res.send('OK');
  } catch (err) {
    console.error('Erro ao processar webhook:', err);
    res.status(500).send('Erro interno');
  }
});

app.listen(3000, () => console.log('Webhook rodando na porta 3000'));
