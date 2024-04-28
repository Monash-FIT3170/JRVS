
const asyncHandler = require('express-async-handler')

const lessonModel = require('../models/lessonModel')


const getLesson = asyncHandler (async (req, res) => {
    const lessonId = req.params.id
    const lesson = await lessonModel.findById(lessonId)

    if (!lesson) {
        res.status(404).json({message: 'Lesson not found'})
    } else {
        res.status(200).json(lesson);
    }
})


module.exports = {
    getLesson
}