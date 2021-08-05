const jwt = require("jsonwebtoken");

const TokenManager = {
  sign: (user) => {
    const { username, id, admin } = user;
    return jwt.sign({ username, id, admin }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });
  },

  verify: (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) res.status(401).send({ error: "Accès refuser" });

    try {
      req.user = jwt.verify(token, process.env.SECRET_TOKEN);
      next();
    } catch (error) {
      res.status(401).send({ error: "Token invalide" });
    }
  },

  verifyAdmin: (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) res.status(401).send({ error: "Access denied" });

    try {
      const { id, username, admin } = jwt.verify(
        token,
        process.env.SECRET_TOKEN
      );
      if (admin) {
        req.user = { id, username, admin };
        next();
      } else {
        res.status(401).send({ error: "Access denied" });
      }
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  },
};

module.exports = TokenManager;
