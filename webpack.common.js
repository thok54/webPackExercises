const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env.NODE_ENV
const isProd = { mode: env === "production" };
const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== "undefined";

const basePath = __dirname;

module.exports = {
    context: path.join(basePath, "src"),
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    entry: {
        app: ["regenerator-runtime/runtime", "./holaMundo.tsx"],
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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production',
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

    ],
    output: {
        filename: "[name].[chunkhash].js"
    },
};