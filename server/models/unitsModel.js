const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema
const UnitsSchema = new Schema({
  // _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
  numberOfLessons: Number,
  colour: String,
  icon: String,
  title: String,
});

module.exports = mongoose.model("units", UnitsSchema);
