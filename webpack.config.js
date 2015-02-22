var path = require('path');

module.exports = {
  entry: {
    css: './src/less/index.js',
    js: './src/js/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/bundle.js'
  },
  devtool: 'source-map',
  useMemoryFs: true,
  progress: true,
  module: {
    loaders: [
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.ts$/  , loader: 'typescript-loader' },
      { test: /\.jade$/, loader: "react-jade-loader" },
      { test: /\.coffee$/, loader: "imports?cfx=coffeex!coffee" },

      { test: /\.woff(\?v=\d+\.\d+\.\d+|\d)?$/,   loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+|\d)?$/,   loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,       loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,       loader: "file?name=fonts/[name].[ext]" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,       loader: "url?name=fonts/[name].[ext]&limit=10000&minetype=image/svg+xml" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  }
};
