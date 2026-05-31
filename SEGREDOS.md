# Gestão de Segredos — Checklist e Recomendações

## Princípios
- Nunca armazene segredos sensíveis (DB, JWT, Sentry, SMTP, OAuth, etc.) no repositório.
- Use `.env` apenas para desenvolvimento local, nunca para produção/cloud.
- Mantenha um [.env.example](.env.example) com as chaves esperadas, sem valores reais.
- Produção: utilize cofre de segredos (Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager).
- Configure o deploy (CI/CD) para injetar segredos via ambiente seguro.
- Rotacione segredos periodicamente (ex: a cada 90 dias).
- Audite acessos e alterações em segredos.
- Nunca logue segredos ou variáveis sensíveis.
- Documente o processo de gestão de segredos para onboarding e auditoria.

## Exemplo de Integração (Node.js/Express)

### AWS Secrets Manager
```js
const AWS = require('aws-sdk');
const client = new AWS.SecretsManager({ region: 'us-east-1' });
async function loadSecrets() {
  const secret = await client.getSecretValue({ SecretId: 'my-app/production' }).promise();
  const secrets = JSON.parse(secret.SecretString);
  Object.assign(process.env, secrets);
}
```

### Vault
- Use o client oficial ou sidecar para popular variáveis de ambiente.

### Docker/K8s
- Use `secrets` nativos para injetar variáveis no container.

## Referências
- [12 Factor App — Config](https://12factor.net/config)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [HashiCorp Vault](https://www.vaultproject.io/)
- [Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault/)
