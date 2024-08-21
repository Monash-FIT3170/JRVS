const express = require('express')
const router = express.Router()
const { getVideo, createVideo } = require('../controllers/videoController')

router.route('/:id').get(getVideo)

router.post('/', createVideo);


module.exports = router