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
      new dotenv(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new ProvidePlugin({
        process: 'process/browser'
      })
    ],
  });
};
