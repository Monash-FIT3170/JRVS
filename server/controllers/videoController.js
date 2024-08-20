
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

const createVideo = asyncHandler(async (req, res) => {
    const { title, url, heading } = req.body;

    // Validate input
    if (!title || !url || !heading) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        // Create a new video document
        const newVideo = new videoModel({ title, url, heading });
        // Save it to the database
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create video', error: error.message });
    }
});

const updateVideo = asyncHandler (async (req, res) => {
    const videoId = req.params.id;
    const { title, url, heading } = req.body;

    const video = await videoModel.findById(videoId);

    if (!video) {
        res.status(404).json({message: 'Video not found'});
    } else {
        video.title = title;
        video.heading = heading;
        video.url = url;
        await video.save();
        res.status(200).json(video);
    }

})

module.exports = {
    getVideo,
    createVideo,
    updateVideo
}