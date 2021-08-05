const express = require("express");
const router = express.Router();

const AnimeSchema = require("../models/animes");

const TokenManager = require("../lib/tokenManager");

router.get("/", (req, res) => {
  try {
    let limit = req.query.limit;

    if (!limit || limit > 1000) limit = 100;

    AnimeSchema.find({})
      .limit(parseInt(limit))
      .then((documents) => {
        res.send({
          success: true,
          count: documents.length,
          animes: documents,
        });
      })
      .catch((error) => res.status(404).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/id/:id", (req, res) => {
  try {
    const { id } = req.params;
    AnimeSchema.findOne({ _id: id })
      .then((document) => {
        res.send({
          success: true,
          anime: document,
        });
      })
      .catch((error) => res.status(404).send(error));
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/rating", (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    AnimeSchema.find({ "rating.rank": { $ne: null } })
      .sort({ "rating.rank": 1 })
      .limit(limit || 20)
      .then((documents) => {
        res.send({
          success: true,
          count: documents?.length,
          animes: documents,
        });
      })
      .catch((error) => res.status(404).send());
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/popularity", (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    AnimeSchema.find({ "popularity.rank": { $ne: null } })
      .sort({ "popularity.rank": 1 })
      .limit(limit || 20)
      .then((documents) => {
        res.send({
          success: true,
          count: documents?.length,
          animes: documents,
        });
      })
      .catch((error) => res.status(404).send({ error }));
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/season/:season/year/:year", (req, res) => {
  try {
    // const { season, year } = req.params;
    //
    // Anime.find({})
    //   .then((documents) => {
    //     res.send({
    //       success: true,
    //       count: documents?.length,
    //       animes: documents.map((anime) => anime.data),
    //     });
    //   })
    //   .catch((error) => res.status(404).send({ error }));
    //
    // res.send({ success: true, season, year });
    res.status(501).send();
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/season/", (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    AnimeSchema.find({ "season.full": getSeason(new Date()) })
      .limit(limit || 100)
      .then((documents) => {
        res.send({
          success: true,
          season: getSeason(new Date()),
          count: documents.length,
          animes: documents,
        });
      })
      .catch((error) => {
        res.status(404).send({ ...error });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/slug/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    AnimeSchema.findOne({ slug })
      .then((document) => {
        res.send({ success: true, anime: document, slug });
      })
      .catch((error) => res.status(404).send(error));
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/search/:query", (req, res) => {
  try {
    const { query, limit } = req.params;
    const regex = { $regex: new RegExp(`.*${query}.*`, "i") };
    const filters = {
      $or: [
        { "titles.en_jp": regex },
        { "titles.en": regex },
        { "titles.ja_jp": regex },
        { canonicalTitle: regex },
      ],
    };

    AnimeSchema.find(filters)
      .sort({ "popularity.rank": 1 })
      .limit(limit || 100)
      .then((documents) => {
        res.send({
          success: true,
          count: documents.length,
          animes: documents,
        });
      })
      .catch((error) => res.status(404).send(error));
  } catch ({ message }) {
    res.status(500).send({ error: message });
  }
});

router.post("/", TokenManager.verifyAdmin, async (req, res) => {
  try {
    const { body } = req;

    res.send({ success: true, body });
  } catch (error) {
    res.status(500).send("Une error est survenue");
  }
});

router.patch("/", async (req, res) => {
  try {
    res.status(501).send();
  } catch ({ message }) {
    res.status(500).send({ error: message });
  }
});

const getSeason = (date = new Date()) => {
  const year = date.getFullYear();
  const season = parseInt(new Date(date).getMonth());

  if (season > 9) {
    return `Fall ${year}`;
  } else if (season > 6) {
    return `Summer ${year}`;
  } else if (season > 3) {
    return `Springs ${year}`;
  } else {
    return `Springs ${year}`;
  }
};

module.exports = router;
