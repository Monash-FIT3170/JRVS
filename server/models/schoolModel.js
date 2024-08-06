const mongoose = require('mongoose')

const schoolSchema = mongoose.Schema(
    {
        SchoolName: {
            type: String,
            required: true,
            unique: true
        },
    },  
    {
        timestamps: true
    }
)

module.exports = mongoose.model('School', schoolSchema)