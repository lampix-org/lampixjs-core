const path = require('path');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'lampix.js',
    library: 'lampix',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', 'js']
  },
  devtool: 'inline-source-map'
};