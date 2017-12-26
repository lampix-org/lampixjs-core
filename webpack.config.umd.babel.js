import path from 'path';
import webpack from 'webpack';

export default (env = {}) => ({
  entry: {
    'lampix': './src/index.ts'
  },
  output: {
    filename: 'lampix.js',
    path: path.resolve(__dirname, 'lib/umd'),
    library: 'lampix',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
});
