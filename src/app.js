const express = require('express');
const config = require('config');
const addRequestId = require('express-request-id');
const morgan = require('morgan');

require('./common/database');
const errorHandler = require('./common/errorHandler');
const logger = require('./common/logger');
const auth = require('./resources/auth/router');
const users = require('./resources/users/router');
const reports = require('./resources/reports/router');
const app = express();

if (!config.get('jwtKey')) {
	logger.error('no key is provided');
}

app.use(express.json());
app.use(addRequestId);

morgan.token('id', req => req.id);
app.use(morgan('combined', { stream: logger.stream }));

app.use(errorHandler);

app.use(auth);
app.use(users);
app.use(reports);

module.exports = app;
