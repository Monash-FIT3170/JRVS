const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    type: String,
    question: String,
    options: [{ option: String, value: String }],
    answer: String

}

    
)

module.exports = mongoose.model('quizzes', quizSchema)