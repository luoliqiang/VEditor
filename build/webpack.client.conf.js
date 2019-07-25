const path = require('path');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const desktop_client_base = './src/assets/desktop_client/';
const desktop_client_dist = path.resolve(__dirname, './../src/assets/desktop_client_dist/');
console.log(process.env.NODE_ENV )
const prod = process.env.NODE_ENV !== 'dev';
module.exports = (env, argv) => {
    return {
        entry: desktop_client_base + 'app.js',
        output: {
            filename: '[name].[chunkhash].js',
            path: desktop_client_dist
        },
        devtool: !prod ? 'source-map' : '',
        // devServer: {
        //     // public: 'dev.inmiao.com',
        //     host: '0.0.0.0',
        //     contentBase: path.join(__dirname, 'qdd-desktop'),
        // },
        module: {
            rules: [
               
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
              },{
                      test: /\.(jpg|png|gif)$/,
                      loader: 'url-loader?limit=5000'
                  },
                  {
                      test: /\.svg$/,
                      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
                  },
           
                {
                    test: /\.(png|jp(e*)g|svg)$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }]
                },
                {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  loader: 'babel-loader',

                  options: {
                      presets: ['env']
                  }
              },
            ]
        },
        plugins: [
          new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                sourceMap: true,
                parallel: true
            }),
            // new ExtractTextPlugin({
            //   filename: path.resolve(desktop_client_dist, '[name].css'),
            //   publicPath: desktop_client_dist,
            //   // Setting the following option to `false` will not extract CSS from codesplit chunks.
            //   // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            //   // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
            //   // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            //   allChunks: false,
            // }),
            new ExtractTextPlugin(path.resolve(desktop_client_dist, '[name].css')),
            new HtmlWebpackPlugin({
                title: '自定义桌面',
                filename: path.resolve(desktop_client_dist, 'htmlGeneratorTemplate.html'),
                template: desktop_client_base + 'htmlGeneratorTemplateSrc.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                inlineSource: prod ? '.(js|css)$' :'.(css)$'// embed all javascript and css inline
            }),
            new HtmlWebpackInlineSourcePlugin()
       
        ]
    };
}
