var webpack = require('webpack'),
    path  = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry:'./src/app.js',
  output:{
    path:path.resolve(__dirname,'build'),
    filename: 'build.[hash].js'
  },
  module:{
    rules:[
      {
        test: /\.less$/,
        use:ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:['css-loader','less-loader']
        })
      },
      {
        test:/\.(jpg|png|svg|gif)$/,
        use:[
          {
            loader: 'url-loader',
            options:{
              limit:'8000',
              name: 'images/[name].[ext]'
            }
          }
         ],
      },
      {
        test: /\.json$/,
        use:['json-loader']
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        query: {
          presets:['es2015','react','stage-0']
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    }),
    new ExtractTextPlugin('style.[hash].css')
  ]
}