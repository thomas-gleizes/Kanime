const mongoose = require("mongoose");

const animeSchema = mongoose.Schema(
  {
    kitsu_id: { type: Number, required: true },
    slug: { type: String, required: true },
    canonicalTitle: { type: String, required: true },
    titles: {
      en_jp: String,
      ja_jp: String,
      en: String,
    },
    synopsis: { type: String },
    description: { type: String },
    season: {
      value: Number,
      year: String,
      full: String,
    },
    rating: { average: Number, rank: Number },
    popularity: { user_count: Number, rank: Number },
    date_begin: { type: Date },
    date_end: { type: Date },
    type: { type: String },
    poster: {
      tiny: String,
      small: String,
      medium: String,
      large: String,
      original: String,
    },
    cover: {
      tiny: String,
      small: String,
      medium: String,
      large: String,
      original: String,
    },
    episode_count: { type: Number },
    episode_length: { type: Number },
    status: { type: String },
    link: {
      self: String,
      saga: String,
    },
    created_at: { type: Date, default: new Date() },
    update_at: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Anime", animeSchema);
