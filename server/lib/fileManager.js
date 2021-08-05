const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);

const FileManager = {
  buildPath: (id, filename) => {
    return `${appDir}/public/media/user/${id}/${filename}`;
  },

  getExtension: (filename) => {
    const arr = filename.split(".");
    if (arr.length === 0) return null;
    return arr[arr.length - 1];
  },

  createDirectoryMedia: (id) => {
    const path = `${appDir}/public/media/user/${id}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  },

  removeFile: (id, media) => {
    console.log("media", media);

    return new Promise((resolve, reject) => {
      const path = `${appDir}/public/${media}`;
      fs.unlink(path, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },

  encodeFile: (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "base64", (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  },

  encodeFileSync: (path) => {
    return fs.readFileSync(path, "base64");
  },

  saveMedia: (id, media, name) => {
    return new Promise((resolve, reject) => {
      const midPath = `${appDir}/public/media/user/`;
      const { data, extension } = media;
      const type = extension.split("/")[1];
      const path = `${midPath}/${id}/${name}.${type}`;

      fs.writeFile(path, new Buffer(data, "base64"), (err) => {
        if (err) reject(err);
        else resolve(`/media/user/${id}/${name}.${type}`);
      });
    });
  },
};

module.exports = FileManager;
