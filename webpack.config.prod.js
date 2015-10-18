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
        filename: 'build/main.js',
        chunkFilename: '[id].bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false
        })
    ]
};
