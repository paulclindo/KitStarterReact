const path = require('path');
const common = require('./webpack.common')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "EN")
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contentHash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template/home.html",
      filename: "index.html",
      // favicon: "./src/images/img/logo/favicon.ico",
      // chunks: ['home', 'vendor'],
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    
  ],
  module: {
    rules: [{
      // test: /\.scss$/,
      test: /\.s?css$/,
      use: [
        MiniCssExtractPlugin.loader, //3.Extract css into files
        'css-loader', //2.Turns css into common js
        'sass-loader', //1.Turns sass into css
      ]
    }, ]
  },
});