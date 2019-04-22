'use strict'

const path = require('path'),
      VueLoaderPlugin = require('vue-loader/lib/plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

// this file is under 'config' folder
function resolve(...relativePaths) {
    return path.resolve(__dirname, '..', ...relativePaths)
}

module.exports = {
    mode: 'production',
    entry: {
        app: resolve('src', 'index.js')
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
                loader: 'babel-loader',
                options: {
                    plugins: [ '@babel/plugin-syntax-dynamic-import' ]
                }
            },
            {
                test: /\.md$/,
                use: [
                    'vue-loader',
                    'vmark-loader'
                ]
            },
            {
                test: /\.ya?ml$/,
                loader: 'yaml-import-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin,
        new HtmlWebpackPlugin({
            filename: resolve('dist', 'index.html'),
            template: resolve('src', 'template', 'app.html'),
            hash: true
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: [ '.vue', '.js', '.json', '.md', '.yml', '.yaml' ]
    }
}
