const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        test: /\.css$/,
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve('src'),
      '@@': path.resolve(),
    },
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
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
