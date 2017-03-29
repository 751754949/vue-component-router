var path = require('path')
var webpack = require('webpack')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = {
  entry: {
    example: path.resolve(__dirname, '../example/index.js'),
    vendor: ['vue'],
  },
  output: {
    path: path.resolve(__dirname, '../example'),
    publicPath: '/',
    library: 'VueComponentRouter',
    libraryTarget: 'umd',
    filename: '[name].build.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules'),
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: process.env.NODE_ENV ? JSON.stringify(process.env.NODE_ENV) : "'development'",
      },
    }),
  ],
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: 'example/',
    inline: true,
    hot: true,
    quiet: true,
    stats: {
      colors: true,
      chunks: false,
    },
  },
}

module.exports = config
