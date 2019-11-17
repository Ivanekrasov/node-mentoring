const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 32
	}
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtKey'));
	return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		// TODO: change for prod
		password: Joi.string().min(3).max(255).required()
		// password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,32})/).required()
	});
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
