'use strict'

const { resolve } = require('path'),
      { readFileSync } = require('fs'),
      { pages } = require('yaml').parse(readFileSync(pathTo('content', 'site.yml'), 'utf8')),
      VueLoaderPlugin = require('vue-loader/lib/plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      PrerenderSPAPlugin = require('prerender-spa-plugin'),
      Renderer = PrerenderSPAPlugin.PuppeteerRenderer

// this file is under 'config' folder
function pathTo(...relativePaths) {
    return resolve(__dirname, '..', ...relativePaths)
}

module.exports = () => ({
    mode: 'production',
    entry: {
        app: pathTo('src', 'index.js')
    },
    output: {
        filename: '[name].js',
        path: pathTo('dist'),
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
            hash: true,
            filename: pathTo('dist', 'index.html'),
            template: pathTo('src', 'template', 'app.html')
        }),
        new PrerenderSPAPlugin({
            staticDir: pathTo('dist'),
            routes: Object.values(pages).map(p => p.link),
            renderer: new Renderer({
                injectProperty: 'renderContext',
                inject: {}
            })
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: [ '.vue', '.js', '.json', '.md', '.yml', '.yaml' ]
    }
})
