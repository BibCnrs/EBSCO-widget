'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var version = require('./package.json').version;

var sassOptions = [
    'includePaths[]=' + path.resolve(__dirname, './lib/sass/'),
    'includePaths[]=' +
        path.resolve(__dirname, './node_modules/compass-mixins/lib'),
    'outputStyle=expanded',
].join('&');

var sassLoader = {
    test: /\.scss/g,
    exclude: /node_modules/,
    loader: ExtractTextPlugin.extract('css!sass?' + sassOptions),
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
                    presets: ['react', 'es2015', 'stage-2'],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(woff2?|svg|ttf|eot|jpe?g|gif|ico)?$/,
                loader: 'file?name=[path][hash].[ext]&context=./src',
                exclude: /node_modules/,
            },
            sassLoader,
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?importLoaders=1',
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2|png|jpg)(\?.+)?$/,
                loader: 'url-loader',
            },
        ],
    },
    entry: {
        app: ['./lib/index.js', './lib/sass/style.scss'],
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        path: './build',
        filename: '[name].js',
        chunkFilename: '[id].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './lib/index.html',
            inject: 'body',
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            __VERSION__: JSON.stringify(version),
            __SERVER_URL__: null,
        }),
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'babel-polyfill': '_babelPolyfill',
    },
};
