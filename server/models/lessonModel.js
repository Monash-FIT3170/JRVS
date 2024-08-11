const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contentSchema = new mongoose.Schema({
    // type: String,
    // text: String

    _id: mongoose.Schema.Types.ObjectId,
    heading: { type: String, required: true },
    points: { type: [String], required: false }, // Optional
    type: { type: String, required: true },
    imageSrcs: { type: [String], required: false }, // Optional
    imageSrc: { type: String, required: false }, // Optional
    text: { type: String, required: false } // Optional
});

const lessonSchema = mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true }, // Automatically generate ObjectId
    title: String,
    content: [contentSchema]
}

    
)

module.exports = mongoose.model('lessons', lessonSchema)