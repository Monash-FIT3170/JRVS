const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contentSchema = new mongoose.Schema({
    type: String,
    text: String
  });

const lessonSchema = mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
    title: String,
    content: [contentSchema]
}

    
)

module.exports = mongoose.model('lessons', lessonSchema)