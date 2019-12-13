require('express-async-errors');
const path = require('path');
const { createLogger, format, transports, error } = require('winston');
require('winston-daily-rotate-file');

const rootFolder = path.dirname(require.main.filename);

const options = {
	file: {
		level: 'info',
		dirname: `${rootFolder}/logs`,
		filename: 'application-%DATE%.log',
		handleExceptions: true,
		json: true,
		timestamp: true,
		maxsize: '5m', // 5MB
		maxFiles: '14d',
		colorize: false
	},
	console: {
		level: 'debug',
		timestamp: true,
		handleExceptions: true,
		json: false,
		colorize: true
	}
};

const { combine, timestamp, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} ${level}: ${message}`;
});
const logger = new createLogger({
	format: combine(
		timestamp(),
		myFormat
	),
	transports: [
		new transports.DailyRotateFile(options.file),
		new transports.Console(options.console)
	],
	exitOnError: false
});

logger.stream = {
	write: (message, encoding) => {
		logger.info(message);
	}
};

process.on('uncaughtException', ex => error(ex.message, ex));
process.on('unhandledRejection', ex => error(ex.message, ex));

module.exports = logger;
