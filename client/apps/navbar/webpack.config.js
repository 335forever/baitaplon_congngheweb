const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const { ProvidePlugin } = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    watch: true,
    devServer: {
      port: 10000
    },
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new ProvidePlugin({
        process: 'process/browser'
      })
    ],
  });
};
