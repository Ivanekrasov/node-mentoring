const moment = require('moment');
const getDataFromCsv = require('./mapper/request');

exports.getNewUsers = (req, res) => {
	// TODO: implement limitations by users number, page size & page number
	getDataFromCsv()
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
};

exports.getUsersSortedBySalary = (req, res) => {
	getDataFromCsv()
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
};

exports.getUsersWithBadges = (req, res) => {
	if (!req.params.badgeName) return res.status(400).send('Badge type is required');
	getDataFromCsv()
		.then(csv => {
			const noHeaderCsv = csv.slice(1);
			return noHeaderCsv
				.filter(user => user.slice(5).some(value => value === req.params.badgeName));
		})
		.then(filtered => filtered.map(user => ({
			name: user[0],
			lastName: user[1],
			badges: user.slice(5)
		})))
		.then(users => res.send(users))
		.catch(error => console.log(error));
};
