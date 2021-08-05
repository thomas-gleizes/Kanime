// scripts lib
const express = require("express");

// scripts models
const User = require("../models/user");
const Rooms = require("../models/room");

// scripts utils
const SecurityManager = require("../lib/securityManager");
const TokenManager = require("../lib/tokenManager");
const ErrorManager = require("../lib/errorManager");
const FileManager = require("../lib/fileManager");

const router = express.Router();

// register
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (await checkEmail(data.email)) {
      res
        .status(400)
        .send({ key: "email", message: "L'email est déjà utilisé" });
      return;
    }

    if (await checkUsername(data.username)) {
      res
        .status(400)
        .send({ key: "username", message: "L'username est déjà utilisé" });
      return;
    }

    data.password = await SecurityManager.hash(data.password);
    const user = new User({ ...data });
    data.username = data.username.toLowerCase();

    user
      .save()
      .then((document) => {
        const { password, ...rest } = parseDocument(document);

        const token = TokenManager.sign({ ...rest });
        res.header("auth-token", token).send({
          user: rest,
          token,
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const document = await User.findOne({ username: username });

    if (!document) {
      res.status(400).send("username/password incorrect.");
      return;
    }

    SecurityManager.compare(password, document.password)
      .then(() => {
        const { password, ...user } = parseDocument(document);
        const token = TokenManager.sign(user);

        res.send({ success: true, user, token });
      })
      .catch(() => {
        res.status(400).send({ message: "username/password incorrect." });
      });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// all
router.get("/", (req, res) => {
  try {
    User.find()
      .then((documents) => {
        const users = documents.map((document) => {
          const { password, media, follow, ...rest } = parseDocument(document, [
            "avatar",
          ]);
          return rest;
        });

        res.send({ users });
      })
      .catch(({ message }) => {
        res.status(500).send({ error: message });
      });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// current
router.get("/current", TokenManager.verify, (req, res) => {
  try {
    const { user } = req;

    User.findOne({ _id: user.id })
      .then((document) => {
        const { password, ...user } = parseDocument(document);
        res.send({ ...user });
      })
      .catch(() => {
        res.status(400).send({ message: "utilisateur introuvable" });
      });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// find user
router.get("/find/:username", (req, res) => {
  try {
    const { username } = req.params;

    User.findOne({ username: username })
      .then((document) => {
        const { password, admin, ...user } = parseDocument(document);

        res.send({ success: true, user });
      })
      .catch(() => {
        res.status(400).send({ message: "Utilisateur introuvable" });
      });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// edit
router.patch("/", TokenManager.verify, async (req, res) => {
  try {
    let {
      body: { media, ...user },
      user: { id },
    } = req;

    FileManager.createDirectoryMedia(id);

    const { media: currentMedia } = await User.findById(id).catch(() => {});
    const keys = Object.keys(media);

    const path = {};
    for (let i = 0; i < keys.length; i++) {
      const name = keys[i];
      const value = media[name];

      if (value) {
        if (currentMedia[name]) {
          await FileManager.removeFile(id, currentMedia[name]);
        }
        path[keys[i]] = await FileManager.saveMedia(id, value, name);
      }
    }

    User.findByIdAndUpdate(
      id,
      { $set: { ...user, media: { ...currentMedia, ...path } } },
      { new: true }
    )
      .then((document) => {
        const user = parseDocument(document);
        res.send({ success: true, user, path });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// get media
router.get("/:username/media", async (req, res) => {
  try {
    const { username } = req.params;

    const { _doc: user } = await User.findOne({ username });

    if (user.media) {
      const { _id: id, media } = user;
      const keys = Object.keys(media);

      for (let i = 0; i < keys.length; i++) {
        const path = FileManager.buildPath(id, media[keys[i]]);
        const extension = FileManager.getExtension(media[keys[i]]);
        const file = await FileManager.encodeFile(path);

        media[keys[i]] = { extension, file };
      }
    }

    res.send({ media: user.media });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// follow
router.patch("/:username/follow", TokenManager.verify, async (req, res) => {
  try {
    const { username } = req.params;
    const { id } = req.user;

    const newFollow = await User.findOne({ username: username });

    if (!newFollow) {
      res.status(400).send({ message: "utilisateur introuvable" });
      return;
    }

    User.findByIdAndUpdate(
      id,
      { $addToSet: { follow: newFollow.id } },
      { new: true }
    )
      .then((document) => {
        const { follow } = parseDocument(document);
        res.send({ success: true, follow });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

// unfollow
router.patch("/:username/unfollow", TokenManager.verify, async (req, res) => {
  try {
    const { id } = req.user;
    const { username } = req.params;

    const follow = await User.findOne({ username: username });

    User.findByIdAndUpdate(
      id,
      { $pull: { follow: follow.id } },
      { new: true }
    ).then(async (document) => {
      const { follow } = parseDocument(document);

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

      res.send({ success: true, follow });
    });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

router.get("/rooms", TokenManager.verify, async (req, res) => {
  try {
    const { id } = req.user;

    const documents = await Rooms.find({ users: { $in: [id] } });

    const rooms = documents.map(({ _id, users }) => {
      const otherId = users.indexOf(id) === 0 ? users[1] : users[0];

      return {
        id: _id,
        users: users,
        avatar: false,
      };
    });

    res.send({
      success: true,
      count: documents.length,
      rooms,
    });
  } catch (error) {
    res.status(500).send(ErrorManager.generate500(error));
  }
});

const checkEmail = async (email) => {
  return !!(await User.findOne({ email: email }));
};

const checkUsername = async (username) => {
  return !!(await User.findOne({ username }));
};

const parseDocument = ({ _doc: document }, media = []) => {
  const { _id: id, __v, ...rest } = document;
  const user = { id, ...rest };

  return { ...user };
};

module.exports = router;
