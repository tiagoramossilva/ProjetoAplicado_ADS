const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require('path');

module.exports = function override(config, env) {
  config.devtool = false;
  
  config.module.rules.push({
    test: /\.js$/,
    use: ['source-map-loader'],
    enforce: 'pre',
    exclude: [/node_modules/],
  });

  config.devServer = {
    ...config.devServer,
    historyApiFallback: {
      disableDotRule: true,
      index: '/index.js'
    },
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    compress: true,
    port: 3001,
    devMiddleware: {
      publicPath: '/',
      writeToDisk: true, 
    }
  };

  // Configurações existentes de plugins e resolve
  config.plugins.push(new NodePolyfillPlugin());
  config.mode = "development";
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    path: require.resolve("path-browserify"),
    querystring: require.resolve("querystring-es3"),
    util: require.resolve("util/"),
    os: require.resolve("os-browserify/browser"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    zlib: require.resolve("browserify-zlib"),
    child_process: false,
    fs: false,
    events: require.resolve("events/"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};