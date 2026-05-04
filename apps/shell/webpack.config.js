const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { sharedDeps } = require("../../scripts/federation.shared");

module.exports = () => {
  const shellPort = Number(process.env.MFE_SHELL_PORT || 3000);
  const chatPort = Number(process.env.MFE_CHAT_PORT || 3001);
  const obsPort = Number(process.env.MFE_OBS_PORT || 3002);
  const costPort = Number(process.env.MFE_COST_PORT || 3003);

  return {
    entry: path.resolve(__dirname, "src/index.jsx"),
    mode: "development",
    output: {
      publicPath: "auto",
      path: path.resolve(__dirname, "../../dist/shell"),
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
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    devServer: {
      port: shellPort,
      hot: true,
      historyApiFallback: true,
      setupMiddlewares: (middlewares, server) => {
        if (!server) return middlewares;
        server.app.get("/health", (_req, res) => res.json({ status: "ok", service: "mfe-shell-dev" }));
        server.app.get("/ready", (_req, res) => res.json({ status: "ready" }));
        return middlewares;
      }
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "shell",
        remotes: {
          aiChatWidget: `aiChatWidget@http://localhost:${chatPort}/remoteEntry.js`,
          observabilityWidget: `observabilityWidget@http://localhost:${obsPort}/remoteEntry.js`,
          costWidget: `costWidget@http://localhost:${costPort}/remoteEntry.js`
        },
        shared: sharedDeps
      }),
      new HtmlWebpackPlugin({
        templateContent: `<!doctype html><html><head><meta charset=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><title>MFE Shell</title></head><body><div id=\"root\"></div></body></html>`
      })
    ]
  };
};
