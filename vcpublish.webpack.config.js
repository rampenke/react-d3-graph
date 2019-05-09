const path = require("path");

module.exports = {
    context: path.join(__dirname, "vcpublish"),
    devtool: "cheap-module-eval-source-map",
    entry: "./index.jsx",
    output: {
        path: __dirname + "/vcpublish/",
        filename: "rd3g.vcpublish.bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2015", "stage-2"],
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
};
