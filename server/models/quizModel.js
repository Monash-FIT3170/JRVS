const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    type: { type: String, required: true }, //The question type eg: True False, Multiple Choice
    questionText: { type: String, required: true },
    options: [{ 
        option: { type: String, required: true }, 
        value: { type: String, required: true } 
    }],
    answer: { type: String, required: true }
});
const quizSchema = new Schema({
    topic: { type: String, required: true },
    questions: { type: [questionSchema], required: true }
  });
//module.exports = mongoose.model('Quiz', quizSchema);
module.exports = mongoose.model('Quiz', quizSchema);