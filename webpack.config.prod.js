'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var sassOptions = [
    'includePaths[]='+ path.resolve(__dirname, './lib/sass/'),
    'includePaths[]='+ path.resolve(__dirname, './node_modules/compass-mixins/lib'),
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
            { test: /\.(woff2?|svg|ttf|eot|png|jpe?g|gif|ico)?$/, loader: 'file?name=[path][hash].[ext]&context=./src', exclude: /node_modules/ },
            sassLoader,
            { test: /\.css$/, loader: 'style-loader!css-loader?importLoaders=1' },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
                loader: 'url-loader'
            }
        ]
    },
    entry: {
        app: [
            './lib/index.js',
            './lib/sass/style.scss'
        ]
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        path: './build',
        filename: '[name].js',
        chunkFilename: '[id].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false
        })
    ]
};
