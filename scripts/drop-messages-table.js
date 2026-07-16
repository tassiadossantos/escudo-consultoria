// Script para excluir a tabela 'messages' do PostgreSQL usando a biblioteca pg
// Salve este arquivo como drop-messages-table.js e rode com: node drop-messages-table.js

import pkg from 'pg';
const { Client } = pkg;

// Altere as variáveis abaixo conforme sua configuração
const client = new Client({
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
});

async function dropTable() {
  try {
    await client.connect();
    await client.query('DROP TABLE IF EXISTS messages CASCADE;');
    console.log('Tabela messages excluída com sucesso.');
  } catch (err) {
    console.error('Erro ao excluir tabela:', err);
  } finally {
    await client.end();
  }
}

dropTable();
