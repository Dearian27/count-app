// const path = require('path');
import path from 'path';

module.exports = {
  entry: './app.mjs', // Вказуйте шлях до вашого вхідного файлу сервера
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    clean:true,
  },
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
        // use: {
        // }
      }
    ]
  }
};