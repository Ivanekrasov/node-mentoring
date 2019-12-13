const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const {
	userNameMinLength,
	userNameMaxLength,
	emailMinLength,
	emailMaxLength,
	passwordMinLength,
	passwordMaxLength
} = require('../../../config/validationValues');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: userNameMinLength,
		maxLength: userNameMaxLength
	},
	email: {
		type: String,
		required: true,
		minlength: emailMinLength,
		maxlength: emailMaxLength,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minLength: passwordMinLength,
		maxLength: passwordMaxLength
	}
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign({ _id: this._id }, config.get('jwtKey'));
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(userNameMinLength).max(userNameMaxLength).required(),
		email: Joi.string().min(emailMinLength).max(emailMaxLength).required().email(),
		password: Joi.string().min(passwordMinLength).max(passwordMaxLength).required()
	});
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
