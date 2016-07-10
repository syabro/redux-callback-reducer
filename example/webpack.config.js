const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname,
    devtool: 'cheap-module-source-map',
    entry: './src/index',
    output: {
        path: path.resolve('./build'),
        filename: 'app.js',
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src',],
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        'transform-decorators-legacy',
                        'transform-class-properties',
                        'transform-object-rest-spread',
                    ]
                },
            },
        ],
    },
    plugins: [new htmlWebpackPlugin({
        title: 'redux-callback-reducer example',
        inject: true,
    })],
};
