const { path, distPath, srcPath } = require('./paths')
const { smart } = require('webpack-merge')
const webpackCommom = require('./webpack.common')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 抽离css
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');


module.exports = smart(webpackCommom, {
    mode: 'production',
    output: {
        path: distPath,
        filename: '[name]-[contentHash:16].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10 * 1024,
                        outputPath: '/images/'
                    }
                },
                include: srcPath
            },
            {
                test: /\.css$/,
                loader: [miniCssExtractPlugin.loader,'css-loader','postcss-loader'],
                include: srcPath
            },
            {
                test: /\.less$/,
                loader: [miniCssExtractPlugin.loader,'css-loader','postcss-loader','less-loader'],
                include: srcPath
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new miniCssExtractPlugin({
            filename: '[name]-[contentHash:16].bundle.css',
        })
    ],
    optimization:{
        minimizer:[
            // 压缩css
            new OptimizeCSSAssetsPlugin({}),
            // 压缩js
            new TerserPlugin()
        ],
        splitChunks:{
            // initial: 入口chunk，只对异步导入的文件不处理
            // async: 异步chunk，只对异步导入的文件处理
            // all: 全部chunk
            chunks: 'all',
            //
            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk名字
                    priority: 1, // 权限更高，优先抽离，重要！！
                    test: /node_modules/,
                    minSize: 0, // 大小限制
                    minChunks: 1 // 最少复用过几次
                },
                // 公共的模块
                common: {
                    name: 'common',
                    priority: 0, // 优先级
                    minSize: 0, // 大小限制
                    minChunks: 2 // 最少复用过几次
                }
            }
        }
    }
})
