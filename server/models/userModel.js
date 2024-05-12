const { Double } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        points: {
            type: Number,
            required: true,
        }
    },  
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)