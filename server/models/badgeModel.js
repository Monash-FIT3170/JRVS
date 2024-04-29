const mongoose = require('mongoose')

const badgeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        achievedTimestamp: {
            type: Date,
            default: Date.now,
        },
        imagePath: {
            type: String, // Binary data of the image
            required: true, // Mime type of the image
        }
    },  
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Badge', badgeSchema)