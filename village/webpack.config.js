var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin');
    module.exports = {
      entry: './src/App.js',
      output: {
        path:path.resolve(__dirname,'bulid'),
        publicPath: 'http://192.168.2.137:5000/',
        filename:'build.[hash].js'
      },
      module:{
        rules:[
          {
            test:/\.less$/,
            use:[
              'style-loader',
              'css-loader',
              {loader:'postcss-loader',
                options: {
                  plugins: function() {
                    return [require('autoprefixer')];
                  } 
                }
              },
              'less-loader'
            ]
          },
          {
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            query:{
              presets:['es2015','react','stage-0']
            }
          },
          {
            test:/\.(png|jpg|gif|svg)/,
            use:[
              {
                loader:'url-loader',
                options: {
                  limit:'8000',
                  name: 'image/[name].[hash].[ext]'
                }
              }
            ]
          }
        ]
      },
      plugins:[
        new HtmlWebpackPlugin({
          template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
      ],
      devServer:{
        // contentBase:'./',
        inline: true,
        host:'0.0.0.0',
        hot: true,
        historyApiFallback: true,
        port:5000
      },
      stats: {
        colors: true
      },
      devtool: 'source-map'
    }