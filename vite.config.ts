import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// The site is a set of static pages (one index.html per route). Vite builds each of them.
const pages = {
  home: 'index.html',
  work: 'work/index.html',
  honey: 'work/honey/index.html',
  services: 'services/index.html',
  about: 'about/index.html',
  contact: 'contact/index.html',
  notFound: '404.html',
  svcAgents: 'services/ai-agents/index.html',
  svcRag: 'services/rag/index.html',
  svcMvp: 'services/mvp-sprint/index.html',
  svcReliability: 'services/ai-reliability/index.html',
  writing: 'writing/index.html',
  artWhatsapp: 'writing/whatsapp-ai-assistant-cloudflare-workers/index.html',
  artFailover: 'writing/llm-provider-failover/index.html',
  artTimeline: 'writing/how-long-to-build-an-ai-agent/index.html',
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: Object.fromEntries(
          Object.entries(pages).map(([name, file]) => [name, path.resolve(__dirname, file)]),
        ),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
