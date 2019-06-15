const commonPaths = require('./common-paths');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    // webpack 설정부분
    mode: 'production',
    entry: {
        app:[`${commonPaths.appEntry}/index.js`], // 진입 지점(4에서 생략시 src 하위)
    },
    output: {
        // filename: 'bundle.[hash].js' // 번들된 파일 이름을 말한다.
        filename: 'static/[name].[hash].js' // 분할하여 출력됨
    }, // 컴파일된 파일을 저장할 경로를 알려준다.
    devtool: 'source-map', // 애플리케이션 디버깅을 도와준다, 개발시에만 inline-source-map 사용
    module: { // 애플리케이션 내 포함되는 모듈을 정의, ESNext(바벨), CSS 모듈 
        rules: [ // 각 모듈을 처리하는 방법을 설정한다.
            // 첫번째 룰 : css파일을 찾고 style-loader와 css-loader로 css를 처리한다. 그 다음 css-loader에게 CSS모듈 카멜 케이스(camel case), 소스맵을 사용할 것을 지시
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                    {
                        loader: 'css-loader',
                        // options: {
                        //     importLoaders: 2,
                        //     modules: true,
                        //     camelCase: true,
                        //     // sourceMap: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        // }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                ctx: {
                                    autoprefixer: {
                                        browsers: 'last 2 versions'
                                    }
                                }
                            }
                        }
                    }
                ]
            })}
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/styles.[hash].css',
            allChunks: true
        })
    ],   
};

module.exports = config;