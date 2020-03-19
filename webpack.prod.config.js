/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const HtmlWebpackPlugin       = require("html-webpack-plugin");
const TerserPlugin            = require('terser-webpack-plugin');
const autoprefixer            = require('autoprefixer');
const webpack                 = require("webpack");
const path                    = require("path");

//package 變數一定要 "NODE_ENV" 為開頭

const keyName = {};
Object.keys(process.env).map((key, i) => {
  if (key.indexOf("NODE_ENV") == 0) {
    return (keyName[key] = process.env[key]);
  }
});

const prdWebpackConfig = {
  mode            : 'production',
  context         : path.join(__dirname, `/src/modules/table` ),
  entry           : ["./index.js"],
  output          : {
    library         : "BrowserRouter",
    path            : `${__dirname}/commonjs/`,
    filename        : `./index.js`,
    libraryTarget   : 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          //MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer()] },
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limt: 0,
              name: "[path][name].[ext]?[hash:8]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: "60-90",
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /(.jsx|.js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  devServer: {
    historyApiFallback   : true,
    contentBase          : "./src",
    watchContentBase     : false,
    inline               : true,
    port                 : 8003,
    host                 : "0.0.0.0",
    useLocalIp           : false,
    disableHostCheck     : false
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: "development"
    }),
    new webpack.ProvidePlugin({
      $                : "jquery",
      jQuery           : "jquery",
      "window.jQuery"  : "jquery"
    }),
    new MiniCssExtractPlugin({
      //filename: "./css/[name].css"
    }),
    new TerserPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
          output: {
              comments: false,
          }
      }
    }),
  ],
  externals : {
    react: 'react'
  }
};

module.exports = prdWebpackConfig;