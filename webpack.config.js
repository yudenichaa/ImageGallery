const path = require("path");

module.exports = (env = {}) => ({
    entry: {
        index: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "public/"),
        filename: "bundle.js",
    },
    mode: env.production ? "production" : "development",
    devtool: env.production ? "" : "inline-source-map",
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                loader: "file-loader",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
            },
        ],
    },
});
