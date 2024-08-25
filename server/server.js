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

app.use(cors()); // Enable CORS for all routes
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

app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`))

module.exports = app
