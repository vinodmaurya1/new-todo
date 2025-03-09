const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

module.exports = mongoose.model("todo", todoSchema);
