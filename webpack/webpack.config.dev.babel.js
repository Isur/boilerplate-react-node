/* eslint-disable @typescript-eslint/camelcase */
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  target: "web",
  context: path.resolve(__dirname, "../src/client"),
  entry: {
    client: "./index.tsx",
  },
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["awesome-typescript-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.scss$/,
        loader: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
  devServer: {
    port: 3004,
    clientLogLevel: "error",
    hot: true,
    host: "0.0.0.0",
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": "http://localhost:5004",
      "changeOrigin": true,
    },
    historyApiFallback: true,
    publicPath: "/"
  },
  devtool: "source-map",
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
    poll: 2000,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 1,
        },
      },
    },
  },
  stats: {
    all: false,
    builtAt: true,
    colors: true,
    errors: true,
    timings: true,
    version: true,
    warnings: false,
  },
};
