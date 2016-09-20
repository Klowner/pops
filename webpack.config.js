let path = require('path')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

let vueConfig = {
    name: 'js',
    entry: './app/www/src/main.js',
    output: {
        path: path.resolve(__dirname, './app/www/dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

let styleConfig = {
    name: 'css',
    entry: './app/www/scss/main.scss',
    output: {
        path: path.resolve(__dirname, './app/www/dist'),
        publicPath: '/dist/',
        filename: 'main.scss'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass'),
            include: path.resolve(__dirname, './app/www/scss')
        }]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
}

module.exports = [vueConfig, styleConfig]

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}
