const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const config = {
    entry: "./src/script.ts",
    module: {
        rules: [{
            test: /\.ts$/i,
            use: "ts-loader",
            exclude: ["/node_modules/", "/src/test/"],
        },
        {
            test: /\.(scss|css)$/i,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "autoprefixer",
                                ],
                            ],
                        },
                    },
                },
                "sass-loader",
            ],
        },
        {
            test: /\.(woff(2)?|ttf|eot)$/i,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "fonts/",
                },
            }],
        },
        {
            test: /\.(svg|png|jpg|gif)$/i,
            use: [{
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "img/",
                },
            }],
        },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            handlebars: "handlebars/dist/handlebars.min.js",
        },
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: "src/index.html",
    })],
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
        splitChunks: {
            chunks: "all",
        },
    },
    devServer: {
        hot: true,
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    performance: {
        hints: false,
    },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "eval-source-map";
    }

    if (argv.mode === "production") {
        config.devtool = false;
    }

    return config;
};
