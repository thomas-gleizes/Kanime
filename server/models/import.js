const mongoose = require("mongoose");

const importSchema = mongoose.Schema({
  data: {
    type: Object,
  },
  import_at: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Import", importSchema);
