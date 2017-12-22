import path from 'path';
import webpack from 'webpack';

// Plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default (env = {}) => ({
  entry: {
    app: './src/index.ts'
  },
  output: {
    filename: 'app.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],
    modules: [
      'src',
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['common', 'vendor'],
      filename: '[name].[hash].js',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      title: 'Lampix Simulator',
      template: path.resolve(__dirname, 'src/index.html'),
      hash: true,
      inject: true,
      minify: {
        collapseWhitespace: true
      },
      chunks: [
        'vendor',
        'common',
        'app'
      ]
    })
  ],
  watchOptions: {
    ignored: /node_modules/
  }
});
