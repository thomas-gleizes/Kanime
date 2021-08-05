const mongoose = require("mongoose");

const sagasSchema = mongoose.Schema(
  {
    libelle: { type: String, required: true },
    slug: { type: String, required: true },
    animes: { type: [Number] },
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
    created_at: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Saga", sagasSchema);
