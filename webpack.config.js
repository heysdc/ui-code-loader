const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './example/index.js',
  mode: 'development',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
            {
                loader: 'html-loader'
            }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
            test: /\.(vue|html)$/,
            use: [
                {
                    loader: 'ui-code-loader'
                }
            ],
            enforce: 'pre',
            exclude: [path.resolve(__dirname, './node_modules')] // better exlude node_modules
        }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './example/template/index.html')
    })
  ]
}