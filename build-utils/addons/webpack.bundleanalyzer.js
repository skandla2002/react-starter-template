const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

    module.exprots = {
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'server'
            })
        ]
    }