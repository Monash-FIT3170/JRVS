const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    title: String,
    heading: String,
    url: String,
})

module.exports = mongoose.model('videos', videoSchema)