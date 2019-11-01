const csv = require('csvtojson');
const {path} = require('../../config/dropbox');
const dropbox = require('./auth');

module.exports = () => dropbox.filesDownload({path})
	.then(data => {
		const strFromBuffer = data.fileBinary.toString();
		return csv({
			noheader: true,
			output: 'csv'
		})
			.fromString(strFromBuffer);
	})
	.catch(error => console.log(error));
