const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:'./src/app.js',
  output:{
    path: path.resolve(__dirname,'bulid'),
    filename: 'build.[hash].js'
  },
  module:{
    rules:[
    {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {loader:'postcss-loader',options: {plugins: function() {return [require('autoprefixer')];} }},
          'less-loader' 
        ]
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
            test: /\.jsx?$/, // test 去判断是否为.js或.jsx,是的话就是进行es6和jsx的编译
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0']
            }
        }
    ]
  },
  resolve:{
    extensions:['.less','.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './',
    inline: true,
    hot: true,
    historyApiFallback: true, // 不跳转
    port: 1000,
    host: '0.0.0.0'
  },
  devtool: 'source-map'
}