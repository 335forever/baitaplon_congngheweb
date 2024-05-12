const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "login",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 10003
    },
    externals: {
      '@TachMonShop/api': "//localhost:3939/TachMonShop-api.js"
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
