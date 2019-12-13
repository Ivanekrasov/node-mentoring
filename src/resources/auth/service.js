const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { User } = require('../users/model');
const {
	emailMinLength,
	emailMaxLength,
	passwordMinLength,
	passwordMaxLength
} = require('../../../config/validationValues');

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(emailMinLength).max(emailMaxLength).required().email(),
		password: Joi.string().min(passwordMinLength).max(passwordMaxLength).required()
	});
	return schema.validate(req);
}

module.exports = async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) {
		next(Boom.badRequest(error.details[0].message));
	}

	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(Boom.badRequest());
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) {
		return next(Boom.badRequest());
	}

	const token = user.generateAuthToken();
	res.send(token);
};
