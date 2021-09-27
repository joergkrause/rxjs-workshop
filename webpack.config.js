const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pageNames = fs.readdirSync('./src/web')
  .filter(file => file.endsWith('.html'))
  .map(file => file.replace(/\.[^/.]+$/, ""));

let multipleHtmlPlugins = pageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./src/web/${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

let multipleEntryPoints = Object.fromEntries(pageNames.map(name => [name, `./src/web/${name}.ts`]));

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 9000,
  },
  target: 'web',
  entry: multipleEntryPoints,
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name]-bundle.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/        
      }
    ]
  },
  plugins: [...multipleHtmlPlugins,
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/sample.json', to: '' }
      ]
    })
  ]
};