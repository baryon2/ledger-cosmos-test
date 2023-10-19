const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    fs: false,
    net: false,
    tls: false,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),

  });
  config.resolve.alias = {
    "@": path.resolve(__dirname, "src/"),
  };
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  });
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
