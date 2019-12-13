const logger = require('./logger');

module.exports = (err, req, res, next) => {
	logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	return res.status(err.output.statusCode).json(err.output.payload);
};
