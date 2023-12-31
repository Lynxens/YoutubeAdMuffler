const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "production",
    entry: {
        'chrome/youtube-ad-muffler': path.resolve(__dirname, "../src/youtube-ad-muffler.ts"),
        'firefox/youtube-ad-muffler': path.resolve(__dirname, "../src/youtube-ad-muffler.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: ".", to: ".", context: "public"},
            ],
        }),
        new ZipPlugin({
            filename: 'youtube-ad-muffler.zip',
            path: path.join(__dirname, "../dist/firefox"),
            exclude: [
                '/\.xpi$/',
            ],
        }),
    ],
};
