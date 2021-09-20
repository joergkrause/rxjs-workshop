const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

let pageNames = ['debounceTime', 'switchMap'];

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
  plugins: multipleHtmlPlugins
};