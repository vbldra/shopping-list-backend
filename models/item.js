const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  toBuy: {
      type: Boolean,
      required: true,
      default: true
  }
});

module.exports = mongoose.model("Item", ItemSchema);
