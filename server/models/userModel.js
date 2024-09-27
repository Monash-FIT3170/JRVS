/**
 * @file userModel.js
 * @description Mongoose model for the User collection. This schema defines the structure for user documents, including fields for user details, authentication, customization options, and relationships with other users.
 * @module userModel
 * @requires mongoose
 * @requires bcryptjs
 * @requires crypto
 */

const { Double } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

/**
 * @typedef {Object} User
 * @property {string} usertype - The type of user (e.g., teacher or student).
 * @property {string} username - The unique username for the user.
 * @property {string} firstname - The first name of the user.
 * @property {string} lastname - The last name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} school - The school associated with the user.
 * @property {string} password - The hashed password for the user.
 * @property {string} points - The points associated with the user.
 * @property {string} [avatar] - The URL or path to the user's avatar.
 * @property {string} [border] - The URL or path to the user's border image.
 * @property {string} [background] - The URL or path to the user's background image.
 * @property {string[]} [unlockedAvatars] - An array of unlocked avatar identifiers.
 * @property {string[]} [unlockedBorders] - An array of unlocked border identifiers.
 * @property {string[]} [unlockedBackgrounds] - An array of unlocked background identifiers.
 * @property {number} level - The level of the user, defaulting to 0.
 * @property {ObjectId[]} assignedUnits - An array of unit identifiers assigned to the user.
 * @property {string} [sharableCode] - A unique code for teachers, used for sharing or access control.
 * @property {ObjectId} [teacherId] - The ObjectId of the teacher, if applicable.
 * @property {ObjectId[]} students - An array of student identifiers associated with the user.
 * @property {string[]} [badges] - An array of badge identifiers awarded to the user.
 * @property {Date} createdAt - Timestamp when the user record was created (automatically generated).
 * @property {Date} updatedAt - Timestamp when the user record was last updated (automatically generated).
 */
const userSchema = mongoose.Schema(
  {
    usertype: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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
      default: 0,
    },
    assignedUnits: {
      type: Array,
      required: true,
    },
    sharableCode: {
      type: String,
      required: function () {
        return this.usertype == "teacher";
      },
      unique: true,
    },
    assignedUnits: {
      type: Array,
      required: false,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    badges: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (this.usertype === "teacher" && !this.sharableCode) {
    let uniqueCodeFound = false;
    while (!uniqueCodeFound) {
      const newCode = crypto.randomBytes(3).toString("hex");
      const existingUser = await mongoose
        .model("User")
        .findOne({ sharableCode: newCode });
      if (!existingUser) {
        this.sharableCode = newCode;
        uniqueCodeFound = true;
      }
    }
  }

  next();
});

/**
 * @function comparePassword
 * @description Compares a plain text password with the hashed password stored in the database.
 * @param {string} password - The plain text password to compare.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 */
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
