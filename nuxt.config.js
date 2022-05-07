export default {
  ssr: true, //ssr
  target: "server",
  // target: "static", //ssg
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s minami takanori portfolio",
    htmlAttrs: {
      lang: "ja",
      prefix: "og: http://ogp.me/ns#",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "ポートフォリオサイト",
      },
      { hid: "robots", name: "robots", content: "noindex" },
      { name: "format-detection", content: "telephone=no" },

      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "minami takanori portfolio",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }, //　twitterの画像サイズ
    ],
    link: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
    ],
    base: {
      href: "router.base",
    },
  },

  router: {
    base: "/",
  },
  // serverMiddleware: [
  // ],
  serverMiddleware:
    process.env.NODE_ENV !== "production"
      ? [
          { path: "/api/article", handler: "~/api/article.js" },
          { path: "/api/list", handler: "~/api/list.js" },
          { path: "/api/nextPage", handler: "~/api/nextPage.js" },
          { path: "/api/firstPage", handler: "~/api/firstPage.js" },
        ]
      : [],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: "~/assets/scss/_functions.scss" }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/axios", "@/plugins/fetchJSON"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/svg",
    "@nuxtjs/style-resources",
    "@nuxtjs/google-fonts",
    "@nuxtjs/pwa",
  ],
  googleFonts: {
    families: {
      Montserrat: [300, 500, 700],
    },
    display: "block",
    download: true,
    inject: true,
  },
  styleResources: {
    scss: ["@/assets/scss/_functions.scss"],
    hoistUseStatements: true,
  },
  manifest: {
    //pwa 用
    name: "minami takanori portfolio",
    lang: "ja",
    short_name: "3na3",
    title: "minami takanori portfolio",
    "og:title": "minami takanori portfolio",
    description: "minami takanori ポートフォリオサイト",
    "og:description": "minami takanori ポートフォリオサイト",
    theme_color: "#000000",
    background_color: "#000000",
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // 環境変数
  publicRuntimeConfig: {
    sendMailURL: process.env.SEND_MAIL_URL,
    apiKey:
      process.env.NODE_ENV !== "production" ? process.env.VUE_API_KEY : null,
    apiURL:
      process.env.NODE_ENV !== "production" ? process.env.VUE_API_URL : null,
  },
  privateRuntimeConfig: {
    apiKey: process.env.VUE_API_KEY,
    apiURL: process.env.VUE_API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["three"],
    extend(config, ctx) {
      if (!!config.module) {
        config.module.rules.push({
          test: /\.(vert|frag)$/i,
          use: ["raw-loader"],
        });
      }
    },

    postcss: {
      // キーとしてプラグイン名を、値として引数を追加します
      preset: {
        // postcss-preset-env 設定を変更します
        autoprefixer: {
          overrideBrowserslist: ["last 2 versions"],
          cascade: false,
        },
      },
    },
  },
};
