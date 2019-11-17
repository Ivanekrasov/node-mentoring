const csv = require('csvtojson');
const downloadFromDropbox = require('../../cloudApis/dropbox');

module.exports = downloadFromDropbox
	.then(data => {
		const strFromBuffer = data.fileBinary.toString();
		return csv({
			noheader: true,
			output: 'csv'
		})
			.fromString(strFromBuffer);
	})
	.catch(error => console.log(error));
