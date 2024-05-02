const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const { ProvidePlugin } = require("webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "footer",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 10001
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
