const csv = require('csvtojson');

const downloadFromDropbox = require('../../../cloudApis/dropbox');

module.exports = async () => {
	try {
		const data = await downloadFromDropbox();
		const strFromBuffer = data.fileBinary.toString();
		const parsedCsv = csv({
			noheader: true,
			output: 'csv'
		}).fromString(strFromBuffer);
		const noHeaderCsv = parsedCsv.slice(1);

		return noHeaderCsv.map(user => ({
			name: user[0],
			lastName: user[1],
			salary: user[2],
			salaryUsd: user[3],
			joinDate: user[4],
			badges: user[5].map(badge => ({
				badgeName: badge[0],
				badgeData: badge[1]
			}))
		}));
	} catch (error) {
		return error;
	}
};
