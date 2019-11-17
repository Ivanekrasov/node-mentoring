const {path} = require('../../../config/dropbox');
const dropbox = require('./auth');

module.exports = () => dropbox.filesDownload({path});
