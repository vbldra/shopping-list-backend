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
  },
  priority: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
  }
});

module.exports = mongoose.model("Item", ItemSchema);
