module.exports = {
    entry: [
        './src/App.js'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['react']
                }
            }],
        }]
    },
    mode: 'development'

};