const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const { User } = require('../../../src/resources/users/model');

describe('user.generateAuthToken', () => {
	it('should return a valid JWT', () => {
		const payload = {
			_id: new mongoose.Types.ObjectId().toHexString()
		};
		const user = new User(payload);
		const token = user.generateAuthToken();
		const decoded = jwt.verify(token, config.get('jwtKey'));
		expect(decoded).toMatchObject(payload);
	});
});
