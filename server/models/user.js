const mongoose = require("mongoose");
const Moment = require("moment");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 255,
    },
    password: {
      type: String,
      required: true,
    },
    create_at: {
      type: Date,
      default: Moment().format("YYYY-MM-DD HH:mm:ss"),
    },
    city: {
      type: String,
      max: 255,
    },
    birthday: {
      type: String,
      max: 255,
    },
    gender: {
      type: String,
      max: 255,
    },
    bio: {
      type: String,
      max: 1024,
    },
    follow: {
      type: Array,
    },
    media: {
      avatar: {
        type: String,
      },
      background: {
        type: String,
      },
    },
    admin: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
