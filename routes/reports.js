const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth');
const downloadFromDropbox = require('../helpers/dropbox/download');

router.get('/new-users', auth, (req, res) => {
	// const {limit = 3, pageSize = 3, pageNum = 1} = req.body;
	downloadFromDropbox()
		.then(csv => {
			const noHeaderCsv = csv.slice(1);
			return noHeaderCsv
				.sort((firstUserRegDate, secondUserRegDate) => (
					moment(secondUserRegDate[4]).unix() - moment(firstUserRegDate[4]).unix()
				));
		})
		.then(sorted => sorted.map(user => ({
			name: user[0],
			lastName: user[1],
			join_date: user[4]
		})))
		.then(users => res.send(users))
		.catch(error => console.log(error));
});

module.exports = router;
