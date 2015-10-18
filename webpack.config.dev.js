'use strict';

var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },
    entry: './lib/index.js',
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: 'main.js',
        chunkFilename: '[id].bundle.js',
        publicPath: 'http://localhost:3001/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false
        })
    ]
};
