const rootPkg = require("../package.json");

module.exports = {
  sharedDeps: {
    react: {
      singleton: true,
      requiredVersion: rootPkg.dependencies.react
    },
    "react-dom": {
      singleton: true,
      requiredVersion: rootPkg.dependencies["react-dom"]
    },
    "@mfe/widget-core": {
      singleton: true,
      requiredVersion: rootPkg.dependencies["@mfe/widget-core"]
    }
  }
};
