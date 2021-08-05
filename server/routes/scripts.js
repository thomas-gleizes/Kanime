const express = require("express");
const router = express.Router();

const tokenManager = require("../lib/tokenManager");
const File = require("../lib/File");

const Room = require("../models/room");
const Anime = require("../models/animes");
const Import = require("../models/import");
const fetch = require("node-fetch");

router.post("/message", tokenManager.verifyAdmin, async (req, res) => {
  try {
    const room = new Room({
      users: ["6071daa9c9b66744ac6a7a58", "607470dafdf85e4d204904a6"],
    });

    const document = await room.save();

    res.send({ success: true, document });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/file", tokenManager.verifyAdmin, async (req, res) => {
  const path = File.buildPath();

  res.send({ success: true, path });
});

router.get("/testRR", tokenManager.verifyAdmin, async (req, res) => {
  //await Anime.remove({});
  const total = await Import.countDocuments();

  let i = 0;
  while (i < total) {
    const items = await Import.find().skip(i).limit(100);
    i += items.length;

    for (let j = 0; j < items.length; j++) {
      const { data } = items[j];

      const month = new Date(data.startDate).getMonth();

      let name = "";
      let value = 1;
      if (month > 9) {
        name = "fall";
        value = 4;
      } else if (month > 6) {
        name = "Summer";
        value = 3;
      } else if (month > 3) {
        name = "Springs";
        value = 2;
      } else {
        name = "Winter";
        value = 1;
      }
      const season = {
        value: value,
        year: new Date(data.startDate).getFullYear(),
        full: `${name} ${new Date(data.startDate).getFullYear()}`,
      };

      await new Anime({
        kitsu_id: data.id,
        slug: data.slug,
        canonicalTitle: data.canonicalTitle,
        titles: data.titles,
        synopsis: data.synopsis,
        description: data.description,
        season: season,
        date_begin: data.startDate,
        rating: { average: data.averageRating, rank: data.ratingRank },
        popularity: { user_count: data.userCount, rank: data.popularityRank },
        date_end: data.endDate,
        type: data.showType,
        poster: data.posterImage,
        cover: data.coverImage,
        episode_count: data.episodeCount,
        episode_length: data.episodeLength,
        status: data.status,
        created_at: new Date(),
        update_at: new Date(),
      }).save();
    }
  }

  res.send({ success: true, total: total });
});

router.get("/update", tokenManager.verifyAdmin, async (req, res) => {
  const kitsuURI = "https://kitsu.io/api/edge/anime";

  const total = await Import.countDocuments({});
  const kitsuTotal = await fetch(kitsuURI)
    .then((response) => response.json())
    .then(({ meta }) => meta.count);

  const tab = [];

  let n = total;
  while (n < kitsuTotal) {
    const data = await fetch(`${kitsuURI}?page[limit]=20&page[offset]=${n}`)
      .then((response) => response.json())
      .then((json) => json.data);

    for (let i = 0; i < data.length; i++) {
      const anime = data[i];
      n++;

      tab.push(anime.id, anime.attributes.slug);

      await new Import({ data: { ...anime.attributes, id: anime.id } }).save();
    }
  }

  res.send({ success: true, total, kitsuTotal, tab });
});

module.exports = router;
