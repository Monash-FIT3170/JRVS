const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    type: String,
    question: String,
    options: [{ option: String, value: String }],
    answer: String

    // Below used by unitController to create empty quiz with specified quiz sub-type. Is above correct?
    ,topic: { type: String }
    ,questions: [{type: { type: String }}] 
}

    
)

module.exports = mongoose.model('quizzes', quizSchema)