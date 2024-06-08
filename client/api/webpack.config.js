const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const dotenv = require("dotenv-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "api",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      port: 3939,
      allowedHosts: 'all'
    },
    plugins: [
      new dotenv(),
    ]
  });
};
