const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Text Editor',
        description: 'Just another Text Editor',
        background_color: '#ffffff',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'assets/icons',
            ios: true,
            purpose: 'any maskable',
            rename: 'icon-[width].[ext]'
          },
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/images',
            to: path.resolve(__dirname, 'dist/assets/icons'),
            globOptions: {
              ignore: ['**/.*'], // ignore dot files and directories
            },
            noErrorOnMissing: true, // don't throw error if files don't exist
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'responsive-loader',
          options: {
            outputPath: 'assets/icons',
            name: 'icon-[width].[ext]',
            sizes: [96, 128, 192, 256, 384, 512],
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};