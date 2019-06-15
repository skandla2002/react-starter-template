const commonPaths = require('./common-paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry: {
        vendor: ['semantic-ui-react'], // 메인 앱에서 특정 라이브러리를 빼내어 vendor로 만든다
    },
    output: {
        path: commonPaths.outputPath,
        publicPath: '/'
    },
    module: {
        // 두번째 룰 : node_modules 디렉터리를 제외한 자바스크립트 파일을 찾은 다음 babel-loader를 통해 바벨을 사용해 바닐라 자바스크립트로 변환한다. 바벨은 .babelrc 파일에서 설정 내용을 읽는다.
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    optimization: { // 이 부분을 생략하면 Webpack은 vendor로 에플리케이션을 분할할 것이다. 이부분을 추가하면 용량이 대폭 줄어 든다(CommonsChunkPlugin > Inintial vendor chunk)
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        })
    ]
};
module.exports = config;