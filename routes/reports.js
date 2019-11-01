const moment = require('moment');
const express = require('express');
const router = express.Router();
const auth = require('../middlware/auth');
const downloadFromDropbox = require('../helpers/dropbox/download');

router.get('/new-users', auth, (req, res) => {
	// TODO: implement limitations by users number, page size & page number
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

router.get('/top-salary', auth, (req, res) => {
	downloadFromDropbox()
		.then(csv => {
			const noHeaderCsv = csv.slice(1);
			return noHeaderCsv
				.sort((firstUser, secondUser) => (
					firstUser[2].replace(',', '') - secondUser[2].replace(',', '')
				));
		})
		.then(sorted => sorted.map(user => ({
			name: user[0],
			lastName: user[1],
			salary: user[2],
			salary_usd: user[3]
		})))
		.then(users => res.send(users))
		.catch(error => console.log(error));
});

router.get('/bagde:badgeName', auth, (req, res) => {
	if (!res.params.badgeName) return res.status(400).send('Badge type is required');
	downloadFromDropbox()
		.then(csv => {
			const noHeaderCsv = csv.slice(1);
			return noHeaderCsv
				.filter(user => user.slice(5).some(value => value === res.params.badgeName));
		})
		.then(filtered => filtered.map(user => ({
			name: user[0],
			lastName: user[1],
			badges: user.slice(5)
		})))
		.then(users => res.send(users))
		.catch(error => console.log(error));
});

module.exports = router;
