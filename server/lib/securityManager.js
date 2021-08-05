const bcrypt = require("bcrypt");

const SecurityManager = {
  hash: async (string) => {
    return await bcrypt.hash(
      process.env.SEED + string,
      parseInt(process.env.SALT)
    );
  },

  compare: (string, hash) => {
    return new Promise(async (resolve, reject) => {
      const bool = await bcrypt.compare(process.env.SEED + string, hash);
      if (bool) resolve();
      else reject();
    });
  },
};

module.exports = SecurityManager;
