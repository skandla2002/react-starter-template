const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    // webpack 설정부분
    mode: 'development',
    entry: {
        vendor: ['semantic-ui-react'], // 메인 앱에서 특정 라이브러리를 빼내어 vendor로 만든다
        app:'./src/index.js', // 진입 지점(4에서 생략시 src 하위)
    },
    output: {
        // filename: 'bundle.[hash].js' // 번들된 파일 이름을 말한다.
        filename: '[name].[hash].js' // 분할하여 출력됨
        ,publicPath: '/' // hotloader는 중첩된 경로에서 동작하지 않는다.
    }, // 컴파일된 파일을 저장할 경로를 알려준다.
    devtool: 'inline-source-map', // 애플리케이션 디버깅을 도와준다, 개발시에만 inline-source-map 사용
    module: { // 애플리케이션 내 포함되는 모듈을 정의, ESNext(바벨), CSS 모듈 
        rules: [ // 각 모듈을 처리하는 방법을 설정한다.
            // 두번째 룰 : node_modules 디렉터리를 제외한 자바스크립트 파일을 찾은 다음 babel-loader를 통해 바벨을 사용해 바닐라 자바스크립트로 변환한다. 바벨은 .babelrc 파일에서 설정 내용을 읽는다.
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // 첫번째 룰 : css파일을 찾고 style-loader와 css-loader로 css를 처리한다. 그 다음 css-loader에게 CSS모듈 카멜 케이스(camel case), 소스맵을 사용할 것을 지시
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        // options: {
                        //     importLoaders: 2,
                        //     modules: true,
                        //     camelCase: true,
                        //     // sourceMap: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        // }
                    }
                ]
            }
        ]
    },
    optimization: { // 이 부분을 생략하면 Webpack은 vendor로 에플리케이션을 분할할 것이다. 이부분을 추가하면 용량이 대폭 줄어 든다(CommonsChunkPlugin > Inintial vendor chunk)
        splitChunks: {
            cacheGroups: {
                vender: {
                    chunks: 'initial',
                    test: 'vendor',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // HMR 업데이트시 브라우저 터미널에 표시해 알아보기 쉽게 한다.7
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        })
    ],
    devServer: {
        host: 'localhost',
        port: port, // 기본 3000
        historyApiFallback: true,
        open: true // 브라우저 자동 열림
        ,hot: true // 서버에 HMR 작동을 허락한다.
    },
};