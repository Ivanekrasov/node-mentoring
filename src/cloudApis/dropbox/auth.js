const fetch = require('isomorphic-fetch');
const {Dropbox} = require('dropbox');
const {token} = require('../../../config/dropbox');
// const config = require('config');
// const accessToken = config.get('dropboxToken');
module.exports = new Dropbox({accessToken: token, fetch});
