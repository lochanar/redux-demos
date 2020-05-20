const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development"; // For babel plugins

module.exports = {
  mode: "development",
  target: "web", // can set it to node if you're not running this in browser
  devtool: "cheap-module-source-map", // lets us see original code in the browser
  entry: "./src/index", // entry point of the app
  // where we want webpack to output
  // tricky because webpack doesn't output code in dev mode
  // it merely serves our app from memory
  // however, we do have to declare these paths so that it knows where it is serving from memory
  output: {
    path: path.resolve(__dirname, "build"), // its not going to write to any file in this dir, but rather serving from this dir
    publicPath: "/", //public URL of the output dir when it's referenced from the browser
    filename: "bundle.js" //physical file won't be generated
  },
  // You can choose to serve your app using aby node based web server like Express too
  // Here we are going serve via webpack
  devServer: {
    stats: "minimal", //less log noise when running
    overlay: true, //overlay any errors that occur in the browswer
    historyApiFallback: true, //all requests will be sent to index.html - can load deep links
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],
  // tell webpack what files we want to handle
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
