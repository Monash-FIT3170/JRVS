const asyncHandler = require("express-async-handler");

const lessonProgressModel = require("../models/lessonProgressModel");

const getLessonProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.params.lessonId;
  const lessonProgress = await lessonProgressModel.findOne({
    userId: userId,
    lessonId: lessonId,
  });

  if (!lessonProgress) {
    res.status(404).json({ message: "Lesson progress not found" });
  } else {
    res.status(200).json(lessonProgress);
  }
});

const updateLessonProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.params.lessonId;
  const { lastSectionIndex, progressNum, isCompleted } = req.body;

  const lessonProgress = await lessonProgressModel.findOne({
    userId: userId,
    lessonId: lessonId,
  });

  if (!lessonProgress) {
    res.status(404).json({ message: "Lesson progress not found" });
  } else {
    lessonProgress.lastSectionIndex = lastSectionIndex;
    if (progressNum > lessonProgress.progressNum)
      lessonProgress.progressNum = progressNum;
    if (lessonProgress.isCompleted == false)
      lessonProgress.isCompleted = isCompleted;
    await lessonProgress.save();
    res.status(200).json(lessonProgress);
  }
});

const createLessonProgress = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const lessonId = req.params.lessonId;
  const { lastSectionIndex, progressNum, isCompleted } = req.body;
  let lessonProgress = await lessonProgressModel.findOne({
    userId: userId,
    lessonId: lessonId,
  });
  if (lessonProgress) {
    res.status(404).json({ message: "Lesson progress already exists" });
  } else {
    lessonProgress = new lessonProgressModel({
      userId: userId,
      lessonId: lessonId,
      lastSectionIndex: lastSectionIndex,
      progressNum: progressNum,
      isCompleted: isCompleted,
    });
    await lessonProgress.save();
    res.status(201).json(lessonProgress);
  }
});

module.exports = {
  getLessonProgress,
  updateLessonProgress,
  createLessonProgress,
};
