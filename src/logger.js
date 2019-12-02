const debug = require('debug');

const error = debug('app:error');
const log = debug('app:log');
log.log = console.log.bind(console);
log('logger connected');

exports = {
	log,
	error
};
