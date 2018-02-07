'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var version = require('./package.json').version;

var sassOptions = [
    'includePaths[]='+ path.resolve(__dirname, './lib/sass/'),
    'includePaths[]='+ path.resolve(__dirname, './node_modules/compass-mixins/lib'),
    'outputStyle=expanded'
].join('&');

var sassLoader = {
    test: /\.scss/g,
    exclude: /node_modules/,
    loaders: ['style', 'css', 'sass?' + sassOptions]
};

module.exports = {
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'stage-2']
                },
                exclude: /node_modules/
            },
            sassLoader,
            { test: /\.css$/, loader: 'style-loader!css-loader?importLoaders=1' },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2|png|jpg)(\?.+)?$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    entry: {
        app: [
            './lib/index.js',
            './lib/sass/style.scss',
            'webpack-dev-server/client?http://app'
        ]
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: 'main.js',
        chunkFilename: '[id].bundle.js',
        publicPath: 'http://app/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './lib/index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: true,
            __VERSION__: JSON.stringify(version),
            __SERVER_URL__: JSON.stringify(process.env.server_url)
        }),
        new ExtractTextPlugin('build/app.css', {
            allChunks: true
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'babel-polyfill': '_babelPolyfill'
    }
};
