const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose
  .connect("your_mongodb_uri", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));
// A userProgress object to keep track of each user's progress.
// It holds the necessary learning paths that the user is assigned to, as well as lesson nodes within each lesson path that has been completed.

// CONSIDERATIONS:
// State of the node is still WIP,
// we might need to implement an index for each lesson to improve performance when quering lessons
const UserProgressSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  learningPaths: [
    {
      pathId: {
        type: String,
        required: true,
      },
      totalLessons: {
        type: Number,
        default: 0,
      },
      lessonsCompleted: {
        type: Number,
        default: 0,
      },
      nodes: [
        {
          nodeId: {
            type: String,
            required: true,
          },
          state: {
            type: String,
            enum: ["not_started", "in_progress", "completed"],
            default: "not_started",
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("userProgress", UserProgressSchema);
