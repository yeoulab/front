var path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    // 처음 로드하는 파일을 지정
    entry: {
        main: __dirname + '/src/index.js'
    },
    output: {
        path: __dirname + '/public/dist/',
        filename: '[name].js',
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                use: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
          }),
        //   new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production'), // 아래 EnvironmentPlugin처럼 할 수도 있습니다.
        //   }),
          new webpack.EnvironmentPlugin(['NODE_ENV']), // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세입니다.
    ],
    devServer: {
        contentBase: './public/', // 웹서버 루트디렉토리
        //port: 8080,
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            //apiUrl: 'http://35.221.64.133:4000',
            apiUrl: 'http://localhost:4000'
        })
    }
}