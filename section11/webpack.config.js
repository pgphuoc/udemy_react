const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const jsRegex = /\.js$/;
const cssRegex = /\.css$/;

const VENDOR_LIBS = ['react', 'react-dom'];

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS,
  },

  output: {
    path: path.join(__dirname, 'dist'),
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
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    runtimeChunk: 'single',
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve('src'),
      '@@': path.resolve(),
    },
  },

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    open: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: false,
    }),
  ],
};

// const config = {
//   entry: "./src/index.js",
//   mode: "development",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "build"),
//   },
//   module: {
//     rules: [
//       {
//         use: "babel-loader",
//         test: /\.js$/,
//       },
//       // Can't use MiniCssExtractPlugin.loader, "style-loader" in once times
//       // {
//       //   use: [MiniCssExtractPlugin.loader, "style-loader", "css-loader"],
//       //   test: /\.css$/,
//       // },
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, "css-loader"],
//       },
//     ],
//   },
//   plugins: [new MiniCssExtractPlugin()],
// };

module.exports = config;
