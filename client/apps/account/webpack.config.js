const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "account",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 10006
    },
    externals: {
      "@TachMonShop/styleguide": "//localhost:11000/TachMonShop-styleguide.js",
      "@TachMonShop/api": "//localhost:3939/TachMonShop-api.js",
      '@TachMonShop/notification': "//localhost:9001/TachMonShop-notification.js"
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
