const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

const paths = {
  appJs: path.resolve(__dirname, "..", "src/index.js"),
  src: path.resolve(__dirname, "..", "src"),
  www: path.resolve(__dirname, "..", "www")
};

const resolvePath = dir => path.resolve("..", dir);

module.exports = {
  mode: "development",
  entry: [paths.appJs],
  output: {
    path: paths.www,
    filename: "bundle.js",
    publicPath: ""
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": paths.src
    }
  },
  devServer: {
    hot: true,
    open: true,
    compress: true,
    contentBase: paths.www
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        include: [
          paths.src,
          resolvePath("node_modules/framework7"),
          resolvePath("node_modules/framework7-vue"),
          resolvePath("node_modules/template7"),
          resolvePath("node_modules/dom7"),
          resolvePath("node_modules/ssr-window")
        ]
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "images/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("development")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: true
    })
  ]
};
