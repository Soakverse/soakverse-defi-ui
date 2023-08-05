// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      infuraProjectId: process.env.INFURA_PROJECT_ID,
      alchemyApiKey: process.env.ALCHEMY_PROJECT_API_KEY,
      apiUrl: process.env.API_URL,
      appName: "Soakverse DeFI Platform",
      googleTagManager: process.env.NUXT_GOOGLE_TAG_MANAGER,
      gtmDebug: process.env.NUXT_GTM_DEBUG,
      walletConnectProjectId: process.env.WALLET_CONNECT_PROJECT_ID,
    },
  },
  css: ["@/assets/css/main.scss"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      meta: [
        { name: "title", content: "Soakverse DeFI Platform" },
        { name: "charset", content: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "msapplication-TileColor", content: "#06262d" },
        { name: "theme-color", content: "#06262d" },
        {
          name: "og:image",
          content: "https://app.soakverse.io/soakverse-banner.jpg",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
        },
        {
          src: "https://kit.fontawesome.com/b28a2f1a04.js",
          crossorigin: "anonymous",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
          sizes: "180x180",
        },
        {
          rel: "icon",
          href: "/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          rel: "icon",
          href: "/favicon-16x16.png",
          type: "image/png",
          sizes: "16x16",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700",
        },
      ],
    },
  },
  typescript: {
    strict: true,
  },
  routeRules: {
    "/skmt/staking": { redirect: "/staking" },
  },
});
