const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env.NODE_ENV
const isProd = { mode: env === "production" };
const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== "undefined";


const basePath = __dirname;

module.exports = env => {
    ////Use env.<YOUR VARIABLE> here:
    //console.log('NODE_ENV: ', env.NODE_ENV); //// 'local'
    //console.log('Production: ', env.production); //// true
    return {
        context: path.join(basePath, "src"),
        resolve: {
            extensions: [".js", ".ts", ".tsx"]
        },
        entry: {
            app: ["regenerator-runtime/runtime", "./holaMundo.tsx", "./playground.ts"],
            appStyles: "./mystyles.scss",
            vendorStyles: ["../node_modules/bootstrap/dist/css/bootstrap.css"]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true
                    }
                }
            }
        },
        output: {
            filename: "[name].[chunkhash].js"
        },
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "awesome-typescript-loader",
                    options: {
                        useBabel: true,
                        babelCore: "@babel/core" // needed for Babel v7
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, "css-loader"]
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                implementation: require("sass")
                            }
                        }
                    ]
                },
                {
                    test: /.(png|jpg)$/,
                    exclude: /node_modules/,
                    //loader: "file-loader"         //all images in dist
                    loader: "url-loader?limit=500"  //images bigger than X included in dist
                },
                {
                    test: /\.html$/,
                    loader: "html-loader"
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html", // este el nombre que va a la carpeta dist
                template: "index.html" // fichero origen
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[chunkhash].css",
                chunkFilename: "[id].css"
            }),
            new BundleAnalyzerPlugin(),
           // isProd ? plugins.push(new BundleAnalyzerPlugin()) : this.apply = function () { },
            isAnalyze ? plugins.push(new BundleAnalyzerPlugin()) : this.apply = function () { }
        ]
    };
};

