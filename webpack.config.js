// cmd require
let path = require('path');

// constant
let DIST_PATH = 'dist/';

// webpack export
let configs = [
    {
        entry: path.resolve(__dirname, "client/index.js"),

        output: {
            filename: "demo.js",
            path: path.resolve(__dirname, DIST_PATH),
            publicPath: DIST_PATH
        }
    }
];

for (let i = 0; i < configs.length; ++i) {
    configs[i].resolve = {
        extensions: ['.js', '.vue']
    };

    configs[i].module = {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            minimize: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            sourceMap: true
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    };

    configs[i].devtool = "#source-map";

    configs[i].watch = false;

    configs[i].stats = {
        warnings: false
    };
}

module.exports = configs;