const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv-webpack")
const ProvidePlugin = require("webpack").ProvidePlugin

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "TachMonShop";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    watch: true,
    devServer: {
      port: 9000
    },
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      // new dotenv(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
        favicon: "./public/icon-logo.png",
      }),
      // new ProvidePlugin({
      //   process: 'process/browser'
      // })
    ],
    externals: {
      "@TachMonShop/navbar": "//localhost:10000/TachMonShop-navbar.js",
      "@TachMonShop/styleguide": "//localhost:11000/TachMonShop-styleguide.js",
      "@TachMonShop/footer": "//localhost:10001/TachMonShop-footer.js",
      "@TachMonShop/home": "//localhost:10002/TachMonShop-home.js"
    }
  });
};
