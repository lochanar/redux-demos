const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebapckBundleAnalyzer = require("webpack-bundle-analyzer");

process.env.NODE_ENV = "production"; // For babel plugins

module.exports = {
  mode: "production", // configures webpack with some useful defaults for prod build
  target: "web",
  devtool: "source-map", // slower than cheapmap but better quality
  entry: "./src/index",
  // unlike the dev config webpack will write physical files to output dir
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    // Display bundle stats
    new WebapckBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    // To minify CSS and extract to a separate file
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    // Define Plugin let's us make variables available to plugins that webpack
    // is building
    new webpack.DefinePlugin({
      // This global def makes sure React knows it's build in prod mode
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),

    // webpack can create the index.html automatically for us using the given HTML template
    // with an included <script> tag with its src pointing to our app.bundle.js
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
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
        // Generates our minified CSS and extract to a separate file
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
