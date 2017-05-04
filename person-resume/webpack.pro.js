var webpack = require('webpack'),
    path  = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'); // 删除文件
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
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false,
            //exclude: ["dist/1.chunk.js"]
        }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'index.html'
    }),
    new ExtractTextPlugin('style.[hash].css')
  ]
}