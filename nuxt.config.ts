import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  devtools: true,
  runtimeConfig: {
    public: {
      infuraProjectId: process.env.INFURA_PROJECT_ID,
      alchemyApiKey: process.env.ALCHEMY_PROJECT_API_KEY,
      appName: "Soakmont DeFI Platform",
    },
  },
  css: ["@/assets/css/main.scss"],
  meta: {
    title: "Soakmont DeFI Platform",
    charset: "utf-8",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "msapplication-TileColor", content: "#06262d" },
      { name: "theme-color", content: "#06262d" },
      {
        name: "og:image",
        content: "https://app.soakmont.com/soakmont-banner-facebook.jpg",
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
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
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
  typescript: {
    strict: true,
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
});
