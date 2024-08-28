const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new mongoose.Schema({
  type: String,
  heading: String,
  text: { type: String, required: false },
  imageSrc: { type: String, required: false },
  imageSrcs: { type: [String], required: false },
  points: { type: [String], required: false },
});

const lessonSchema = mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
  title: String,
  content: [contentSchema],
});

module.exports = mongoose.model("lessons", lessonSchema);
