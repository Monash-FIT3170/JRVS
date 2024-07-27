const mongoose = require('mongoose')

const lessonProgressSchema = mongoose.Schema({
    userId: String,
    lessonId: String,
    lastSectionIndex: Number,
    progressNum: Number
})

module.exports = mongoose.model('lessonProgress', lessonProgressSchema)