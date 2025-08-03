import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineVitestConfig } from '@nuxt/test-utils/config';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    // you can optionally set Nuxt-specific environment options
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        overrides: {
          // other Nuxt config you want to pass
        },
      },
    },
  },
  plugins: [
    //Обработка nuxt автоимпортов
    AutoImport({
      imports: ['vue'],
      dirs: [resolve(__dirname, 'app/composables/**')],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
      '@': path.resolve(__dirname, './app'),
      '~~': path.resolve(__dirname, './'),
    },
  },
});
