const { mergeWithRules } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const {
  container: { ModuleFederationPlugin },
} = require("webpack");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "TachMonShop",
    projectName: "styleguide",
    webpackConfigEnv,
  });

  const config = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    devServer: {
      port: 11000,
    },
    externals: [/@TachMonShop\/.+/],
    // customize the webpack config here
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            require.resolve("style-loader", {
              paths: [require.resolve("webpack-config-single-spa")],
            }),
            require.resolve("css-loader", {
              paths: [require.resolve("webpack-config-single-spa")],
            }),
            "postcss-loader",
          ],
        },
      ],
    },
    // plugins: [
    //  new ModuleFederationPlugin({
    //     shared: {
    //       react: {
    //         eager: true,
    //         singleton: true,
    //       },
    //       "react-dom": {
    //         eager: true,
    //         singleton: true,
    //       },
    //     },
    //   }),
    // ], 
  });

  return config;
};
