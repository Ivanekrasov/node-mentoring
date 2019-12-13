const mongoose = require('mongoose');
const config = require('config');

const logger = require('../common/logger');

mongoose.set('useFindAndModify', false);
mongoose.set('findOneAndUpdate', false);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

mongoose.connect(config.get('mongoUrl'), { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
	logger.error('Error from database occured');
});

db.once('open', () => {
	logger.info('Mongoose successfully connected');
});

module.exports = mongoose;
