const mongoose = require('mongoose')

const lessonProgressSchema = mongoose.Schema({
    userId: String,
    lessonId: String,
    lastSectionIndex: Number,
    progressNum: Number,
    isCompleted: Boolean
})

module.exports = mongoose.model('lessonProgress', lessonProgressSchema)