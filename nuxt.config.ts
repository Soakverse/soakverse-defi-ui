// https://v3.nuxtjs.org/api/configuration/nuxt.config
import vuetify from 'vite-plugin-vuetify';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
const production = process.env.NODE_ENV === 'production';

export default defineNuxtConfig({
  ssr: false,
  devServer: {
    host: process.env.NUXT_APP_HOST || 'localhost',
    port: process.env.NUXT_APP_PORT
      ? parseInt(process.env.NUXT_APP_PORT)
      : 3000,
  },
  runtimeConfig: {
    public: {
      infuraProjectId: process.env.INFURA_PROJECT_ID,
      alchemyApiKey: process.env.ALCHEMY_PROJECT_API_KEY,
      apiUrl: process.env.API_URL,
      appName: 'Soakverse DeFI Platform',
      googleTagManager: process.env.NUXT_GOOGLE_TAG_MANAGER,
      gtmDebug: process.env.NUXT_GTM_DEBUG,
      walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    },
  },
  css: ['@/assets/css/main.scss'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      meta: [
        { name: 'title', content: 'Soakverse DeFI Platform' },
        { name: 'charset', content: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-TileColor', content: '#06262d' },
        { name: 'theme-color', content: '#06262d' },
        {
          name: 'og:image',
          content: 'https://app.soakverse.io/soakverse-banner.jpg',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
        },
        {
          src: 'https://kit.fontawesome.com/b28a2f1a04.js',
          crossorigin: 'anonymous',
        },
      ],

      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'icon',
          href: '/favicon-32x32.png',
          type: 'image/png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          href: '/favicon-16x16.png',
          type: 'image/png',
          sizes: '16x16',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700',
        },
      ],
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) =>
        // @ts-ignore
        config.plugins.push(vuetify())
      );
    },
  ],
  plugins: [{ src: 'node_modules/nuxtjs-phaser', mode: 'client' }],
  typescript: {
    shim: false,
  },
  vite: {
    plugins: [
      // ↓ Needed for development mode
      // @ts-ignore
      !production &&
        nodePolyfills({
          include: [
            // @ts-ignore
            'node_modules/**/*.js',
            // @ts-ignore
            new RegExp('node_modules/.vite/.*js'),
          ],
        }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        target: 'es2020',
      },
    },
    build: {
      target: 'es2020',
      rollupOptions: {
        plugins: [
          // ↓ Needed for build
          // @ts-ignore
          nodePolyfills(),
        ],
      },
      // ↓ Needed for build if using WalletConnect and other providers
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: {
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util/',
        http: 'http-browserify',
        https: 'https-browserify',
      },
    },
  },
});
