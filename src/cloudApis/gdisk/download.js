const fs = require('fs');
const {google} = require('googleapis');

function downloadFile(auth) {
	const drive = google.drive({version: 'v3', auth});
	const fileId = '1gsLpwPupOBf8rajebMg1MgcH0kcnanlK';
	const dest = fs.createWriteStream('./data.csv');
	drive.files.get({fileId, alt: 'media'}, {responseType: 'stream'},
		(err, res) => {
			res.data
				.on('end', () => {
					console.log('Done');
				})
				.on('error', err => {
					console.log('Error', err);
				})
				.pipe(dest);
		}
	);
}

module.exports = downloadFile;
