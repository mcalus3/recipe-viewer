const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const dir = (...paths) => {
  return path.join(__dirname, ...paths);
};

module.exports = {
  context: __dirname,
  target: 'web',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.css'],
    modules: [dir('src'), dir('node_modules')]
  },
  entry: [dir('src', 'index.js')],
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: dir('postcss.config.js')
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      title: 'recipe-viewer',
      template: dir('index.ejs')
    })
  ]
};
