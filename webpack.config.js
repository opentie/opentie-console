var path = require('path');

module.exports = {
  entry: [
    './src/less/index.js',
    './src/js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
      { test: /\.ts$/  , loader: 'typescript-loader' },
      { test: /\.jade$/, loader: "react-jade-loader" },

      { test: /\.woff(\?v=\d+\.\d+\.\d+|\d)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+|\d)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,       loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,       loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,       loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  }
};
