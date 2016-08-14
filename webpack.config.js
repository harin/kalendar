var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    "webpack-hot-middleware/client",
    './index.js'
  ],
  output: {
      path: path.join(__dirname, 'dist'),
      filename: "bundle.js",
      publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        include: __dirname
      }
    ]
  }
}
