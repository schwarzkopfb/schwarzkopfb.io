'use strict'

const { resolve, basename } = require('path'),
      { readFileSync } = require('fs'),
      { pages } = require('yaml').parse(readFileSync(pathTo('content', 'site.yml'), 'utf8')),
      CopyPlugin = require('copy-webpack-plugin'),
      VueLoaderPlugin = require('vue-loader/lib/plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      PrerenderSPAPlugin = require('prerender-spa-plugin'),
      Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function pathTo(...relativePaths) {
    // '..' is needed because this file is under the 'config' folder
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
        new CopyPlugin([
            { from: pathTo('static'), to: pathTo('dist') }
        ]),
        new HtmlWebpackPlugin({
            hash: true,
            filename: pathTo('dist', 'index.html'),
            template: pathTo('src', 'template', 'app.html')
        }),
        new PrerenderSPAPlugin({
            staticDir: pathTo('dist'),
            routes: Object.values(pages).map(p => p.link),

            // property injection is needed to be able to detect pre-render stage in client-side code
            renderer: new Renderer({
                injectProperty: 'renderContext',
                inject: {}
            }),

            // overwrite output paths to make them more suitable for `serve-handler`
            // (it requires a `404.html` and this behaviour cannot be overridden)
            // for example: /dist/about/index.html -> /dist/about.html
            postProcess (renderedRoute) {
                const fileName = renderedRoute.route === '/'
                    ? 'index.html'
                    : basename(renderedRoute.route) + '.html'

                renderedRoute.outputPath = pathTo('dist', fileName)
        
                return renderedRoute
              }
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        },
        extensions: [ '.vue', '.js', '.json', '.md', '.yml', '.yaml' ]
    }
})
