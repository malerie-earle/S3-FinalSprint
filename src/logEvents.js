const winston = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const color = require('colors');

// Create a 'logs' directory if it doesn't exist
const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  try {
    fs.mkdirSync(logsDir);
  } catch (error) {
    console.error('Error creating logs directory:', error);
  }
}

// Function to get current date and time as a string
function getCurrentDateTime() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}


// Function to create a transport for daily log files
function createDailyRotateTransport(filename) {
  return new winston.transports.DailyRotateFile({
    filename,
    datePattern: 'YYYY-MM-DD',
    maxFiles: '30d'
  });
}

// Function to create a transport for a single log file
function createFileTransport(filename) {
  return new winston.transports.File({
    filename,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
      winston.format.printf(info => `${info.timestamp} - ${info.message}`)
    )
  });
}

// Function to create a logger for search queries
function createSearchQueryLogger() {
  const searchQueryFileTransport = createFileTransport(`${logsDir}/searchQueries.log`);
  return winston.createLogger({
    transports: [searchQueryFileTransport]
  });
}

// Function to create a logger for errors
function createErrorLogger() {
  const errorFileRotateTransport = createDailyRotateTransport(`${logsDir}/%DATE%/error-%DATE%.log`);
  return winston.createLogger({
    transports: [errorFileRotateTransport]
  });
}

// Function to create a logger for login and logout events
function createLoginLogoutLogger() {
  const loginLogoutFileTransport = createFileTransport(`${logsDir}/loginLogout.log`);
  const loginLogoutLogger = winston.createLogger({
    transports: [loginLogoutFileTransport]
  });
  // Log a test message to ensure the logger is working
  loginLogoutLogger.info('Login Logout logger initialized.');
  return loginLogoutLogger;
}

// Function to create a logger for combined logs
function createCombinedLogger() {
  const fileRotateTransport = createDailyRotateTransport(`${logsDir}/%DATE%/combined-%DATE%.log`);
  return winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.printf(info => {
          let colorizedMessage = info.message;
          switch (info.level) {
            case 'info':
              colorizedMessage = color.green(info.message);
              break;
            case 'warn':
              colorizedMessage = color.magenta(info.message);
              break;
            case 'error':
              colorizedMessage = color.red(info.message);
              break;
            case 'http':
              colorizedMessage = color.rainbow(info.message);
              break;
            case 'debug':
              colorizedMessage = color.blue(info.message);
              break;
          }
          // Add current date and time and background color to the entire message
          return color.bgBlack(`${getCurrentDateTime()} - ${colorizedMessage}`);
        })
      }),
      new winston.transports.File({
        filename: `${logsDir}/combined.log`,
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
          winston.format.printf(info => `${info.timestamp} - ${info.message}`)
        )
      })
    ]
  });
}

// Create loggers for different purposes
const searchQueryLogger = createSearchQueryLogger();
const errorLogger = createErrorLogger();
const loginLogoutLogger = createLoginLogoutLogger();
const combinedLogger = createCombinedLogger();

// Function to log search queries
function logSearchQuery(user_id, query, database) {
  searchQueryLogger.info(`User ID: ${user_id}, Query: ${query}, Database: ${database}`);
}

// Function to log errors
function logError(error) {
  errorLogger.error(error);
}

// Function to log login events
function logLogin(user_id) {
  loginLogoutLogger.info(`User ID: ${user_id} logged in`);
}

// Function to log logout events
function logLogout(user_id) {
  loginLogoutLogger.info(`User ID: ${user_id} logged out`);
}

// Function to log messages to the combined log
function logMessage(message) {
  combinedLogger.info(message);
}

module.exports = {
  logSearchQuery,
  logError,
  logLogin,
  logLogout,
  logger: {
    info: logMessage,
    error: logMessage,
    warn: logMessage,
    debug: logMessage
  }
};
