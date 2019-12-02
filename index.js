const config = require('config');
const app = require('./src/app');
const {log} = require('./src/logger');

const port = config.get('port');

app.listen(port, () => log(`App listening on port ${port}`));
