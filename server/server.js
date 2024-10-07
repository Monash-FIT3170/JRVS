/**
 * @file server.js
 * @description This file sets up and configures the Express server for the application.
 * It connects to the database, initializes middleware, and defines routes for various APIs,
 * including authentication, goals, badges, quizzes, lessons, and more.
 *
 * @module Server
 * @requires path
 * @requires express
 * @requires colors
 * @requires dotenv
 * @requires ./middleware/errorMiddleware
 * @requires ./config/db
 * @requires cors
 * @requires ./routes/auth
 * @requires ./routes/goalRoutes
 * @requires ./routes/badgeRoutes
 * @requires ./routes/quizRoutes
 * @requires ./routes/lessonRoutes
 * @requires ./routes/unitRoutes
 * @requires ./routes/userRoutes
 * @requires ./routes/videoRoutes
 * @requires ./routes/schoolRoutes
 * @requires ./routes/lessonProgressRoutes
 * @requires ./routes/xpRoutes
 * @requires ./routes/userUnitProgressRoutes
 * @example
 * // Run the server
 * node server.js
 * @returns {void}
 */

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const cors = require("cors"); // Import cors middleware
const authRoutes = require("./routes/auth");

connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost",
      "https://jrvs-client-production.up.railway.app",
    ],
  }),
); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/badges", require("./routes/badgeRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/lessons", require("./routes/lessonRoutes"));
app.use("/api/units", require("./routes/unitRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));
app.use("/api/schools", require("./routes/schoolRoutes"));
app.use("/api/lessonProgress", require("./routes/lessonProgressRoutes"));
app.use("/api/xp", require("./routes/xpRoutes"));
app.use("/api/lessonProgress", require("./routes/lessonProgressRoutes"));
app.use("/api/userUnitProgress", require("./routes/userUnitProgressRoutes"));
app.use("/api/gemini", require("./routes/genAIRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
