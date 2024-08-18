const path = require('path');

   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
       clean: true, // Очистка директории dist перед каждой сборкой
     },
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: ['style-loader', 'css-loader'],
         },
         {
           test: /\.(png|svg|jpg|jpeg|gif)$/i,
           type: 'asset/resource',
         },
       ],
     },
     devServer: {
       static: './dist',
       open: true, // Автоматическое открытие браузера
     },
     mode: 'development',
   };