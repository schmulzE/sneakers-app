/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.test.tsx', '**/*.test.ts'],
    setupFiles: "./tests/setup.ts",
    globals: true
  },
});