const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        preProcessor,
    ].filter(Boolean);
};

module.exports = {
    // 入口
    entry:'./src/main.js',
    // 输出
    output:{
        // 文件的输出路径
        // __dirname代表当前文件的文件夹目录
        path:path.resolve(__dirname,'../dist'),
        filename:'static/js/main.js',
        clean:true
    },
    // 加载器
    module:{
        rules:[
            // loader的配置
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.less$/i,
                use: getStyleLoaders("less-loader"),
            },
            {
                test: /\.s[ac]ss$/i,
                use: getStyleLoaders("sass-loader"),
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader"),
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
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                    /*
                    * options: {
                    presets: ['@babel/preset-env']
                  }
                    * */
                }
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // 检测哪些文件
            context:path.resolve(__dirname,'../src')
        }),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'static/css/main.css'
        })
    ],
    mode:'production'
    // 模式
}
