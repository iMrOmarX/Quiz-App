const mongoose = require("mongoose")
const random = require("mongoose-simple-random")

let s = new mongoose.Schema({
    question_text: {
        type: String,
        required: true
    },
    right_answer: {
        type: String,
        required: true
    },
    wrong_answers: {
        type: [String],
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    numberOfAnswers: {
        type: Number,
        default: 0
    },
    timesAnswered :{
        type: Number,
        default : 0
    },
    timesAnsweredRight: {
        type: Number,
        default:0
    }
})

s.plugin(random)


const Question = mongoose.model("question",s )

module.exports = Question