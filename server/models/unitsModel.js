const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the main schema
const UnitsSchema = new Schema({
  _id: String,
  colour: String,
  icon: String,
  title: String
});

module.exports = mongoose.model('units', UnitsSchema);
