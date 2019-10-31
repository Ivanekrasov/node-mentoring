const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const auth = require('./routes/auth');
const users = require('./routes/users');
const app = express();

// TODO: dnf to remove default jwt before deployment
if (!config.get('jwtKey')) {
	console.error('ERROR: jwtKey is not defined.');
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
}

// Configure app
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);

mongoose.set('useFindAndModify', false);
mongoose.set('findOneAndUpdate', false);

const port = config.get('port');
// Startup
mongoose.connect(config.get('mongoUrl'), {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('Mongoose successfully connected.'))
	.catch(() => console.error('Mongoose failed to connect.'));

app.listen(port, () => console.log(`App listening on port ${port}`));
