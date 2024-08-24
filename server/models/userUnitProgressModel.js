const mongoose = require('mongoose')

const userUnitProgressSchema = mongoose.Schema({
    userId: String,
    unitId: String,
    completedLessons: [String]
})

module.exports = mongoose.model('user_progress', userUnitProgressSchema)