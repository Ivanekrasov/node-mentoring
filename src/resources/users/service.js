const _ = require('lodash');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { User, validate } = require('./model');

const getCurrentUser = async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
};

const createNewUser = async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) {
		return next(Boom.badRequest(error.details[0].message));
	}

	let user = await User.findOne({ email: req.body.email });
	if (user) {
		return next(Boom.badRequest('User already registered.'));
	}

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	await user.save();

	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
};

module.exports = {
	getCurrentUser,
	createNewUser
};
