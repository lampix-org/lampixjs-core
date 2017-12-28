import path from 'path';
import webpack from 'webpack';

export default (env = {}) => ({
  entry: {
    'lampix': './src/index.ts'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib/umd'),
    library: 'lampix',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".ts", ".js"],
    modules: [
      'src',
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
