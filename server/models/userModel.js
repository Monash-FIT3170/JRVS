const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        default: 0 // Starting with 0 points
    },
    // badges: {
    //     type: String,
    //     required: true, //add
    // }
},
{
    timestamps: true
});

// module.exports = mongoose.model('User', userSchema);
const User = mongoose.model('User', userSchema);
module.exports = User;