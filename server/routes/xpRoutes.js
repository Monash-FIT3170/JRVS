const express = require('express');
const router = express.Router();
const { addXP, getXPWithinPeriod, getLeaderboard } = require('../controllers/xpController');

router.route('/').post(addXP);
router.route('/get-xp-within-period').get(getXPWithinPeriod);
router.route('/leaderboard').get(getLeaderboard);

module.exports = router;