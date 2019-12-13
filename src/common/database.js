const mongoose = require('mongoose');
const config = require('config');

const logger = require('../common/logger');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.get('mongoUrl'));

const db = mongoose.connection;

db.on('error', () => {
	throw new Error('Error from database occured');
});

db.once('open', () => {
	logger.info('Mongoose successfully connected');
});

module.exports = mongoose;
