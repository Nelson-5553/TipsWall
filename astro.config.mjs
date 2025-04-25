// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()],
  },

  env: {
    schema: {
      API_HOST_HOME: envField.string({ context: "server", access: "secret" }),
      API_POST: envField.string({ context: "server", access: "public" }),
      API_USER: envField.string({ context: "server", access: "public" }),
    }
  },

  adapter: vercel()
});