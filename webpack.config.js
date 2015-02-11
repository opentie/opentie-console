var path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.ts$/  , loader: 'typescript-loader' },
      { test: /\.jade$/, loader: "react-jade-loader" }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  }
};
