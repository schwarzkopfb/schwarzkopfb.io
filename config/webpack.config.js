'use strict'

const path = require('path'),
      VueLoaderPlugin = require('vue-loader/lib/plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

// this file is under 'config' folder
function resolve(relativePath) {
    return path.resolve(__dirname, '..', relativePath)
}

module.exports = {
    mode: 'production',
    entry: {
        app: resolve('src/app.js')
    },
    output: {
        filename: '[name].js',
        path: resolve('dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin,
        new HtmlWebpackPlugin({
            filename: resolve('dist/index.html'),
            template: resolve('src/app.html'),
            hash: true
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: [ '.vue', '.js', '.json' ]
    }
}
