// @ts-check
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  preprocess: [vitePreprocess()],
  compilerOptions: {
    runes: (a) =>
      a.filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
  },
};
