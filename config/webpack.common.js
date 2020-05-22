const { path, distPath, srcPath } = require('./paths')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口js文件
    entry: {
        index: path.join(srcPath, 'main.js'),
        index2: path.join(srcPath, 'main2.js')
    },
    resolve: {
        alias: {
            '@': srcPath
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: "index.html", // 区别index2.html <- 重要性就在这里体现了，单入口没提现到
            chunks: ['index'] // 当前html内引入的chunks文件有哪些，默认是全部chunks，这里我们不全部引入
        }),
        new htmlWebpackPlugin({
            template: path.join(srcPath, 'index2.html'),
            filename: "index2.html",
            chunks: ['index2']
        })
    ]
}
