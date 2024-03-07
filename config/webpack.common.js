'use strict';
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const PATHS = require('./paths');

// used in the module rules and in the stats exlude list
const IMAGE_TYPES = /\.(png|jpe?g|gif|svg)$/i;

// To re-use webpack configuration across templates,
// CLI maintains a common webpack configuration file - `webpack.common.js`.
// Whenever user creates an extension, CLI adds `webpack.common.js` file
// in template's `config` folder

const common = {
  output: {
    // the build folder to output bundles and assets in.
    path: PATHS.build,
    // the filename template for entry chunks
    filename: '[name].js',
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    excludeAssets: [IMAGE_TYPES],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
      },
      // Help webpack in understanding CSS files imported in .js files
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
        exclude: /\.module\.css$/,
      },
      // Check for images imported in .js files and
      {
        test: IMAGE_TYPES,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // Add the following plugin to enable React Fast Refresh:
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      // 'window.jQuery': 'jquery',
      // 'window.$': 'jquery',
    }),
    // Copy static assets from `public` folder to `build` folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'public',
        },
      ],
    }),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    fallback: {
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      vm: require.resolve('vm-browserify'),
    },
    extensions: ['', '.js', '.jsx', '.ts'],
    alias: {
      '@/lib/utils': path.resolve(__dirname, '../src/lib/utils'),
      '@/components': path.resolve(__dirname, '../src/components'),
    },
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
};

module.exports = common;
