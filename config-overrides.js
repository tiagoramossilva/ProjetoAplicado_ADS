const webpack = require("webpack");

module.exports = function override(config, env) {
  // Configuração de fallbacks
  config.resolve = {
    ...(config.resolve || {}),
    fallback: {
      ...(config.resolve?.fallback || {}),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
      util: require.resolve("util/"),
      fs: false,
      process: require.resolve("process/browser"),
      buffer: require.resolve("buffer/"),
      zlib: require.resolve("browserify-zlib"), // Adicione esta linha para o canvg
    },
    // Adicione esta parte para resolver o problema de fullySpecified
    fullySpecified: false
  };

  // Configuração de plugins
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    // Adicione este plugin para definir as variáveis globais
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.NODE_DEBUG': JSON.stringify(false),
      'process.version': JSON.stringify('v0.0.0'),
    })
  );

  // Adicione esta regra para ignorar os avisos de fullySpecified
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false
    }
  });

  return config;
};