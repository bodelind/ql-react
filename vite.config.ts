/// <reference types="vitest"/>

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	server: { port: 7223, host: true },
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts', '@testing-library/react/dont-cleanup-after-each'],
	},
});
