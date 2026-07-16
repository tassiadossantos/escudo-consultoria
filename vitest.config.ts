import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: [
      'backend/test/**/*.test.ts',
      'frontend/tests/**/*.test.tsx'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'backend/src/**/*.ts'
      ],
      exclude: [
        'backend/src/index.ts',
        'backend/test/**',
        '**/*.test.ts',
        'frontend/**',
      ],
    },
  },
});
