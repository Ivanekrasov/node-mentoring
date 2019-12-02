const moment = require('moment');

const getDataFromCsv = require('./mapper/request');

const getNewUsers = (req, res) => {
	const noHeaderCsv = getDataFromCsv();
	const sortedCsv = noHeaderCsv.sort((firstUserRegDate, secondUserRegDate) => (
		moment(secondUserRegDate.joinDate).unix() - moment(firstUserRegDate.joinDate).unix()
	));
	const users = sortedCsv.map(user => ({
		name: user.name,
		lastName: user.lastName,
		join_date: user.joinDate
	}));

	res.send(users);
};

const getUsersSortedBySalary = (req, res) => {
	const noHeaderCsv = getDataFromCsv();
	const sortedCsv = noHeaderCsv
		.sort((firstUser, secondUser) => (
			firstUser.salary.replace(',', '') - secondUser.salary.replace(',', '')
		));
	const users = sortedCsv.map(user => ({
		name: user.name,
		lastName: user.lastName,
		salary: user.salary,
		salary_usd: user.salaryUsd
	}));

	res.send(users);
};

const getUsersWithBadges = (req, res) => {
	if (!req.params.badgeName) return res.status(400).send('Badge type is required');

	const noHeaderCsv = getDataFromCsv();
	const filteredCsv = noHeaderCsv.filter(user => user.badges.some(value => value === req.params.badgeName));
	const users = filteredCsv.map(user => ({
		name: user.name,
		lastName: user.lastName,
		badges: user.badges
	}));

	res.send(users);
};

exports = {
	getNewUsers,
	getUsersSortedBySalary,
	getUsersWithBadges
};
