const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "home",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    watch: true,
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 10002,
    },
    externals: {
      "@TachMonShop/styleguide": "//localhost:11000/TachMonShop-styleguide.js",
      "@TachMonShop/api": "//localhost:3939/TachMonShop-api.js",
    },
  });
};
