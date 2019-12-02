const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const config = require('config');
const mongoose = require('./mongodb');
const auth = require('./resources/auth/router');
const users = require('./resources/users/router');
const reports = require('./resources/reports/router');
const {log, error} = require('./logger');
const app = express();

if (!config.get('jwtKey')) {
	error('ERROR: jwtKey is not defined.');
}

app.use(express.json());
app.use(morgan('dev', {
	skip(req, res) {
		return res.statusCode < 400;
	}
}));
app.use(morgan('common', {
	stream: fs.createWriteStream(path.join(config.get('logDir'), 'access.log'), {flags: 'a'})
}));
app.use(auth);
app.use(users);
app.use(reports);

try {
	mongoose.connect(config.get('mongoUrl'), {useNewUrlParser: true, useUnifiedTopology: true});
	log('Mongoose successfully connected.');
} catch (error_) {
	error(error_);
}

module.exports = app;
