const mongoose = require('mongoose')

const badgeSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
    },  
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Badge', badgeSchema)