const mongoose = require('mongoose')

const userUnitProgressSchema = mongoose.Schema({
    userId: String,
    unitId: String,
    completedLessons: Array
})

module.exports = mongoose.model('userUnitProgress', userUnitProgressSchema)