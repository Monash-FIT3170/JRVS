
const asyncHandler = require('express-async-handler')

const videoModel = require('../models/videoModel')


const getVideo = asyncHandler (async (req, res) => {
    const videoId = req.params.id
    const video = await videoModel.findById(videoId)

    if (!video) {
        res.status(404).json({message: 'Video not found'})
    } else {
        res.status(200).json(video);
    }
})


module.exports = {
    getVideo
}