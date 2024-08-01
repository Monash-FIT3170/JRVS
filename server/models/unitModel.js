const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for the children object
const LessonSchema = new Schema({
    id: String,
    icon: String,
    title: String,
    tooltip: {
      content: String
    },
    children: [this]
  });

const UnitSchema = new Schema({
    _id: String,
    data: [LessonSchema]
})

module.exports = mongoose.model('unit_details', UnitSchema);