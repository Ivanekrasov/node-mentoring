const jwt = require('jsonwebtoken');
const config = require('config');
const Boom = require('@hapi/boom');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');
	if (!token) {
		return next(Boom.unauthorized());
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtKey'));
		req.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};
