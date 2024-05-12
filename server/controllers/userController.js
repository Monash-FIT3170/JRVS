const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()

    res.status(200).json(users) 
})

// @desc    Set user
// @route   POST /api/users
// @access  Private
const postUsers = asyncHandler(async(req,res) => {
    if(!req.body.username){
        res.status(400)
        throw new Error("please add a username field")
    }
    if(!req.body.firstname){
        res.status(400)
        throw new Error("please add a firstname field")
    }
    if(!req.body.lastname){
        res.status(400)
        throw new Error("please add a lastname field")
    }
    if(!req.body.email){
        res.status(400)
        throw new Error("please add an email field")
    }
    if(!req.body.school){
        res.status(400)
        throw new Error("please add a school field")
    }
    if(!req.body.password){
        res.status(400)
        throw new Error("please add a password field")
    }
    
    // Create the new user
    const user = await User.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        school: req.body.school,
        password: req.body.password,
        points: 0
    })

    res.status(200).json(user)  
})

module.exports = {
    getUsers,
    postUsers
}