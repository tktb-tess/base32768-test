import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/base32768-test',
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
});
