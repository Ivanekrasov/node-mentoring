const express = require('express');
const config = require('config');
const mongoose = require('./mongodb');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reports = require('./routes/reports');
const app = express();

// TODO: dnf to remove default jwt before deployment
if (!config.get('jwtKey')) {
	console.error('ERROR: jwtKey is not defined.');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}

// Configure app
app.use(express.json());
app.use(auth);
app.use(users);
app.use(reports);

// Startup
mongoose.connect(config.get('mongoUrl'), {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Mongoose successfully connected.'))
	.catch(() => console.error('Mongoose failed to connect.'));

module.exports = app;
