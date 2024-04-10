const path = require("path");
const { VUE_APP_DOMAIN_BASE, VUE_APP_API_BASE, PORT, VUE_APP_IMAGE_PATH_PROXY_KEY, VUE_APP_IMAGE_PATH_DOMAIN } = process.env;

module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: PORT,
    disableHostCheck: true,
    proxy: {
      [`/${VUE_APP_API_BASE}`]: {
        target: VUE_APP_DOMAIN_BASE,
        changeOrigin: true,
        pathRewrite: {
          [`^/${VUE_APP_API_BASE}`]: "",
        },
      },
      [`${VUE_APP_IMAGE_PATH_PROXY_KEY}`]: {
        target: VUE_APP_IMAGE_PATH_DOMAIN ,
        changeOrigin: true,
        secure:false,
        pathRewrite: {
          [`^${VUE_APP_IMAGE_PATH_PROXY_KEY}`]: "",
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src"),
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .options({})
      .end();
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compiler = require("vue-template-babel-compiler");
        return options;
      });
    // config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  }, 
  publicPath: './'
};
