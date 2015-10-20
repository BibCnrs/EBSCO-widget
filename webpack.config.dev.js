'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var sassOptions = [
    'includePaths[]=./lib/sass/',
    'outputStyle=expanded'
].join('&');

var sassLoader = { test: /\.scss/g, exclude: /node_modules/ };
if (['development', 'test'].indexOf(process.env.NODE_ENV) !== -1) {
    sassLoader.loaders = ['style', 'css', 'sass?' + sassOptions];
} else {
    sassLoader.loader = ExtractTextPlugin.extract('css!sass?' + sassOptions);
}

module.exports = {
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            sassLoader
        ]
    },
    entry: {
        app: [
            './lib/index.js',
            './lib/sass/style.scss',
            'webpack-dev-server/client?http://localhost:3001'
        ]
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: 'main.js',
        chunkFilename: '[id].bundle.js',
        publicPath: 'http://localhost:3001/'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: true
        }),
        new ExtractTextPlugin('build/app.css', {
            allChunks: true
        })
    ]
};
