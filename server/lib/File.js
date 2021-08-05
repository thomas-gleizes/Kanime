const fs = require("fs");
const path = require("path");

const appDir = path.dirname(require.main.filename);

class File {
  static buildPath() {
    console.log("appDir", appDir);
    return appDir;
  }
}

module.exports = File;
