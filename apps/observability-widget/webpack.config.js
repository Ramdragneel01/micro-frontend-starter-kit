const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { sharedDeps } = require("../../scripts/federation.shared");

module.exports = () => {
  const port = Number(process.env.MFE_OBS_PORT || 3002);
  return {
    entry: path.resolve(__dirname, "src/index.jsx"),
    mode: "development",
    output: {
      publicPath: "auto",
      path: path.resolve(__dirname, "../../dist/observability-widget"),
      clean: true
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },
    devServer: {
      port,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "observabilityWidget",
        filename: "remoteEntry.js",
        exposes: {
          "./Widget": path.resolve(__dirname, "src/Widget.jsx")
        },
        shared: sharedDeps
      }),
      new HtmlWebpackPlugin({
        templateContent: `<!doctype html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><title>Observability Widget</title></head><body><div id=\"root\"></div></body></html>`
      })
    ]
  };
};
