const config = require('config');
const app = require('./src/app');
const logger = require('./src/common/logger');

const port = config.get('port');

app.listen(port, () => logger.info(`App listening on port ${port}`));
