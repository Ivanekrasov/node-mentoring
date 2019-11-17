const express = require('express');
const router = express.Router();
const auth = require('../../common/auth');
const {
	newUsersReportUrl,
	topSalaryReportUrl,
	withBadgesReportUrl
} = require('../../../config/routes');
const {
	getNewUsers,
	getUsersSortedBySalary,
	getUsersWithBadges
} = require('./service');

router.get(newUsersReportUrl, auth, getNewUsers);
router.get(topSalaryReportUrl, auth, getUsersSortedBySalary);
router.get(withBadgesReportUrl, auth, getUsersWithBadges);

module.exports = router;
