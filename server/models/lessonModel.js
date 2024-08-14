const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    type: String,
    heading: String,
    text: { type: String, required: false },
    imageSrc: { type: String, required: false},
    imageSrcs: { type: [String], required: false},
    points: { type: [String], required: false}
  });

const lessonSchema = mongoose.Schema({
    title: String,
    content: [contentSchema]
});

module.exports = mongoose.model('lessons', lessonSchema)