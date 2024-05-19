const express = require('express')
const router = express.Router()
const { getVideo, setVideo } = require('../controllers/videoController')

router.route('/:id').get(getVideo)

module.exports = router