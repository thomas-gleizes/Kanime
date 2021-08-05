const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    users: {
      type: Array,
      required: true,
    },
    messages: {
      type: Array,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Room", roomSchema);
