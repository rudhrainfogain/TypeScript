const path = require('path');
module.exports = {
    mode: 'production',
    entry: './Section11/src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'Section11/dist')

    },
    devServer: {
        contentBase: __dirname + "/Section11/src",
        port: 9000
    },
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node-modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};