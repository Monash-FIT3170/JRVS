/**
 * @file errorHandlerMiddleware.js
 * @description Middleware for handling errors in an Express application. This middleware function formats the error response and sends an appropriate HTTP status code based on the error type.
 * @module errorHandlerMiddleware
 */

/**
 * @function errorHandler
 * @description Express middleware function to handle errors that occur during request processing. Sets the HTTP status code and responds with a JSON object containing the error message. In a production environment, the error stack trace is omitted for security reasons.
 * @param {Error} err - The error object that was thrown or passed to the middleware.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 */

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.status,
  });
};

module.exports = {
  errorHandler,
};
