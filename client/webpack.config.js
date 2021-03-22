const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/index.jsx'],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'public/assets/',
          publicPath: 'public/assets/',
          postTransformPublicPath: (p) => `__webpack_public_path__ + ${p}`,
        },
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    port: 9000,
  },
  plugins: [
    new Dotenv(),
  ],
};
