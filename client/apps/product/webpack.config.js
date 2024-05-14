const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "product",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 10004
    },
    externals: {
      "@TachMonShop/styleguide": "//localhost:11000/TachMonShop-styleguide.js",
      "@TachMonShop/api": "//localhost:3939/TachMonShop-api.js",
    },
  });
};
