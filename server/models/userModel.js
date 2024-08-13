const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
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
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },
        border: {
            type: String,
            required: false,
        },
        background: {
            type: String,
            required: false,
        },
        unlockedAvatars: {
            type: Array,
            required: false,
        },
        unlockedBorders: {
            type: Array,
            required: false,
        },
        unlockedBackgrounds: {
            type: Array,
            required: false,
        },
        level: {
            type: Number,
            default: 0
        },
        assignedUnits: {
            type: Array,
            required: true
        }
    },  
    {
        timestamps: true
    }
)

/* salt the users password */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema)