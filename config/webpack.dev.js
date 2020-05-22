const { path, distPath, srcPath } = require('./paths')
const { smart } = require('webpack-merge')
const webpackCommom = require('./webpack.common')

module.exports = smart(webpackCommom, {
    mode: 'development',
    module:{
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader',
                include: srcPath
            },
            {
                test: /\.css$/,
                loader: ['style-loader','css-loader','postcss-loader'],
                include: srcPath
            },
            {
                test: /\.less$/,
                loader: ['style-loader','css-loader','postcss-loader','less-loader'],
                include: srcPath
            },
        ]
    }
})
