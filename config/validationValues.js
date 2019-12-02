const config = require('config');

const validationRules = {
	userNameMinLength: 3,
	userNameMaxLength: 50,
	emailMinLength: 5,
	emailMaxLength: 255,
	passwordMinLength: 8,
	passwordMaxLength: 32
};

if (config.get('mode') === 'development') {
	validationRules.passwordMinLength = 3;
}

module.exports = validationRules;
