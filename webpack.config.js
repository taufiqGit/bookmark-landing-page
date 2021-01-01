const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssWebpackPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { merge } = require('webpack-merge')

const Base = {
    entry: "./src/script.js",
    output: {
        filename: '[name]-[hash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssWebpackPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    MiniCssWebpackPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true,
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src'
                                }
                            ]
                        }
                    }
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[contenthash].[ext]',
                        emitFile: true,
                        esModule: false
                    }
                }
            }
        ]
    }
}

const Dev = {
    output: {
        path: path.resolve(__dirname, 'dist', 'Development')
    },
    devtool: 'eval-source-map'
}

const Prod = {
    output: {
        path: path.resolve(__dirname, 'dist', 'Production')
    }
}
module.exports = (env, argv) =>{
    if (argv.mode === 'development') {
        return merge(Base, Dev)
    } else {
        return merge(Base, Prod)
    }
}