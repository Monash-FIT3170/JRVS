/**
 * @file authenticateMiddleware.js
 * @description Middleware for authenticating users using JSON Web Tokens (JWT). This middleware function verifies the token provided in the request header and ensures that the user is authenticated before accessing protected routes.
 * @module authenticateMiddleware
 * @requires jsonwebtoken
 * @requires ../models/userModel
 */

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * @function authenticate
 * @description Express middleware function to authenticate a user by verifying the JWT token provided in the request header. If the token is valid and the user exists, the request proceeds to the next middleware or route handler. If the token is invalid or the user does not exist, a 401 Unauthorized response is sent.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void}
 * @throws {Error} 401 - If the token is invalid or the user does not exist in the database.
 */
const authenticate = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ error: "User not found in database" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate." });
  }
};

module.exports = authenticate;
