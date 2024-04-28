const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    type: String,
    text: String
  });

const lessonSchema = mongoose.Schema({
    title: String,
    content: [contentSchema]
}

    
)

module.exports = mongoose.model('lessons', lessonSchema)