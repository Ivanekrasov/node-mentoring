const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const {User} = require('../users/model');
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

module.exports = async (req, res) => {
	const {error} = validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const user = await User.findOne({email: req.body.email});
	if (!user) {
		return res.status(400).send('Invalid email or password.');
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) {
		return res.status(400).send('Invalid email or password.');
	}

	const token = user.generateAuthToken();
	res.send(token);
};
