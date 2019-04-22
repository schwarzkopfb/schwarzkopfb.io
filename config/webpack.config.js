'use strict'

const path = require('path'),
      { readFile } = require('fs').promises,
      less = require('less'),
      VueLoaderPlugin = require('vue-loader/lib/plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

// this file is under 'config' folder
function pathTo(...relativePaths) {
    return path.resolve(__dirname, '..', ...relativePaths)
}

module.exports = () => {
    // this file isn't watched in dev mode :(
    return readFile(pathTo('src', 'style', 'spinner.less'), 'utf8')
        .then(spinnerLess => less.render(spinnerLess, { paths: [ pathTo('src', 'style') ] }))
        .then(compiled => {
            const spinnerCss = compiled.css

            // this file isn't watched in dev mode :(
            return readFile(pathTo('src', 'script', 'spinner.js'), 'utf8')
                .then(spinnerJs => {
                    return {
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
                                    test: /\.hbs$/,
                                    loader: 'handlebars-loader'
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
                                template: pathTo('src', 'template', 'app.hbs'),
                                templateParameters: {
                                    spinnerCss,
                                    spinnerJs
                                }
                            })
                        ],
                        resolve: {
                            alias: {
                                'vue$': 'vue/dist/vue.esm.js',
                            },
                            extensions: [ '.vue', '.js', '.json', '.md', '.yml', '.yaml', '.hbs' ]
                        }
                    }
                })
        })
}
