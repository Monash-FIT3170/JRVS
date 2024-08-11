const { Double } = require('mongodb');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema(
    {
        usertype: {
            type: String, 
            required: true, 
        },
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
        assignedUnits: {
            type: Array,
            required: true
        },
        sharableCode: {
            type: String,
            required: function() { return this.usertype == 'teacher'; },
            unique: true
        }
    },  
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    if (this.usertype === 'teacher' && !this.sharableCode) {
        let uniqueCodeFound = false;
        while (!uniqueCodeFound) {
            const newCode = crypto.randomBytes(3).toString('hex');
            const existingUser = await mongoose.model('User').findOne({ sharableCode: newCode });
            if (!existingUser) {
                this.sharableCode = newCode;
                uniqueCodeFound = true;
            }
        }
    }

    next();
});
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
