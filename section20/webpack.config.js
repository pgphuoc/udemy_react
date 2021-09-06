const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const jsRegex = /\.js$/;
const cssRegex = /\.css$/;

const VENDOR_LIBS = ['react', 'react-dom', 'lodash', 'react-router-dom'];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/', // Xử lý thêm đuòng dẫn tương đối khi import tự động bởi HtmlWebpackPlugin
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: jsRegex,
        exclude: /node_modules/,
      },
      {
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        test: cssRegex,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader', options: '[path][name].[ext]' }],
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve('src'),
      '@@': path.resolve(),
    },
  },

  optimization: {
    splitChunks: {
      // chunks: 'all',
      name: 'vendor',
    },
    runtimeChunk: 'single',
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: './',
    },
    port: 3000,
    open: true,
    historyApiFallback: true, // Xử lý cho lazy load, sample: router ko thể redirect
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: false,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};

module.exports = config;
