const express = require("express");
const router = express.Router();

const Saga = require("../models/sagas");
const Anime = require("../models/animes");

//get all sagas
router.get("/", async (req, res) => {
  const { offset, limit } = req.query;

  try {
    Saga.find({})
      .skip(parseInt(offset) || 0)
      .limit(parseInt(limit) || 20)
      .then(async (documents) => {
        res.send({
          success: true,
          count: documents.length,
          sagas: documents.map((document) => ({
            ...document._doc,
            length: document.animes.length,
          })),
        });
      })
      .catch((e) => {
        console.error(e);
        res.status(404).send({ error: null });
      });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: 500 });
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const saga = await Saga.findById(id);

    const filters = saga.animes.map((id) => ({
      kitsu_id: id,
    }));

    const animes = await Anime.find({ $or: [...filters] });

    res.send({ success: true, saga, animes });
  } catch (e) {
    console.error(e);
    res.status(500).send({ ...e });
  }
});

router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const saga = await Saga.findOne({ slug });

    const filters = saga.animes.map((id) => ({
      kitsu_id: id,
    }));

    const animes = await Anime.find({ $or: [...filters] });

    res.send({ success: true, saga, animes });
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
