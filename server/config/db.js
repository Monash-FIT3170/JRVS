/**
 * Connects to the MongoDB database using Mongoose.
 *
 * This function establishes a connection to the MongoDB database specified
 * in the `MONGO_URI` environment variable. Upon successful connection, it logs
 * the host of the connected MongoDB instance. If the connection fails, it logs
 * the error and exits the process with a status code of 1.
 *
 * @async
 * @function connectDB
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 */
const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database using Mongoose.
 *
 * This function establishes a connection to the MongoDB database specified
 * in the `MONGO_URI` environment variable. Upon successful connection, it logs
 * the host of the connected MongoDB instance. If the connection fails, it logs
 * the error and exits the process with a status code of 1.
 *
 * @async
 * @function connectDB
 * @throws {Error} Throws an error if the connection to MongoDB fails.
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
