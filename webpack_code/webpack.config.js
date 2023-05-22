const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    // 入口
    entry:'./src/main.js',
    // 输出
    output:{
        // 文件的输出路径
        // __dirname代表当前文件的文件夹目录
        path:path.resolve(__dirname,'dist'),
        filename:'static/js/main.js',
        clean:true
    },
    // 加载器
    module:{
        rules:[
            // loader的配置
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'stylus-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        // 优点：减少请求数量  缺点：体积会更大
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    // 输出图片名称
                    // [hash:10] hash值取前10位
                    filename: "static/images/[hash:10][ext][query]",
                },
            },
            {
                test: /\.(ttf|woff2?|map3|map4|avi)$/,
                type: "asset/resource",
                generator: {
                    // 输出名称
                    filename: "static/media/[hash:10][ext][query]",
                },
            },
        ]
    },
    // 插件
    plugins: [new ESLintPlugin({
        // 检测哪些文件
        context:path.resolve(__dirname,'src')
    })],
    mode:'development'

    // 模式
}
