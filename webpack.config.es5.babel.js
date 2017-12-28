import path from 'path';
import webpack from 'webpack';

export default (env = {}) => ({
  entry: {
    'lampix': './src/index.ts'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib/es5'),
    libraryTarget: 'commonjs2'
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
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              target: 'ES5',
              module: 'CommonJS'
            }
          }
        },
        exclude: /node_modules/
      }
    ]
  }
});
