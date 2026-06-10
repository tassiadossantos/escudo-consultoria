import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    // Garante que o Vitest só procure testes dentro das pastas de testes dos artefatos
    include: [
      'artifacts/api-server/test/**/*.test.ts',
      'artifacts/sst-consultoria/tests/**/*.test.tsx'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Foca a análise estritamente no Core da API
      include: [
        'artifacts/api-server/src/**/*.ts'
      ],
      exclude: [
        'artifacts/api-server/src/index.ts',
        'artifacts/api-server/test/**',
        '**/*.test.ts',
        'artifacts/sst-consultoria/**',
      ],
    },
  },
});