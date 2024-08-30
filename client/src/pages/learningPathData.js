/**
 * @file learningPathData.js
 * @description This module provides static data for the learning path and user progress in the "Recognising AI" course. The learning path data includes information about lessons, quizzes, and videos, with associated icons and tooltips. The user progress data reflects the state of various nodes within the learning path.
 *
 * @module learningPathData
 * @requires ../assets/images/QuizIcon.png
 * @requires ../assets/images/WrittenLessonIcon.png
 * @requires ../assets/images/VideoIcon.png
 *
 * @constant {Array} learningPathData - Static data representing the structure of the learning path. Includes lessons, quizzes, and videos with hierarchical relationships.
 * @constant {Object} savedProgressData - Static data representing the user's progress in the learning path. Tracks the state of various nodes as 'locked', 'unlocked', or 'selected'.
 *
 * @example
 * // Example usage:
 * import { learningPathData, savedProgressData } from './learningPathData';
 * console.log(learningPathData); // Logs the learning path data
 * console.log(savedProgressData); // Logs the user's progress data
 */

import quizIcon from "../assets/images/QuizIcon.png";
import lessonIcon from "../assets/images/WrittenLessonIcon.png";
import videoIcon from "../assets/images/VideoIcon.png";

/* 
  Static data for each lesson in the recognising AI learning path
  This will need to be retrieved from the database
  TODO: Add ids for the actual lessons here
*/
export const learningPathData = [
  // SkillType
  {
    id: "6640555ed3dd29919eec460e",
    icon: lessonIcon,
    title: "Introduction to AI recognition",
    tooltip: {
      content: "Lesson introduction to AI recognition",
    },
    children: [
      {
        id: "6640516ed3dd29919eec460d",
        icon: lessonIcon,
        title: "Recognising AI in real life",
        tooltip: {
          content: "Lesson on recognising AI in real life.",
        },
        children: [
          {
            id: "4",
            icon: videoIcon,
            title: "Video: Recognising AI in real life",
            tooltip: {
              content:
                "Watch the video to learn more about AI recognition in real life.",
            },
            children: [
              {
                id: "6",
                icon: quizIcon,
                title: "Multiple choice quiz",
                tooltip: {
                  content:
                    "Time to test your knowledge with this multiple choice quiz on AI recognition in real life!",
                },
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: "66435798d953163fd76256c4",
        icon: lessonIcon,
        title: "Types of AI recognition",
        tooltip: {
          content: "Lesson on the different types of AI recognition.",
        },
        children: [
          {
            id: "5",
            icon: quizIcon,
            title: "Multiple choice quiz!",
            tooltip: {
              content:
                "Time to test your knowledge with this multiple choice quiz on the different types of AI recognition.",
            },
            children: [
              {
                id: "6643460e6e0276ae96a000b4",
                icon: lessonIcon,
                title: "Image recognition",
                tooltip: {
                  content: "Lesson on image recognition.",
                },
                children: [
                  {
                    id: "10",
                    icon: videoIcon,
                    title: "Video: Detecting AI generated images",
                    tooltip: {
                      content:
                        "Watch the video to learn more about detecting AI generated images.",
                    },
                    children: [
                      {
                        id: "13",
                        icon: quizIcon,
                        title: "Image quiz",
                        tooltip: {
                          content:
                            "Time to test your knowledge with this image quiz on AI image recognition!",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "66434e8bd953163fd76256c2",
                icon: lessonIcon,
                title: "Speech recognition",
                tooltip: {
                  content: "Lesson on speech recognition.",
                },
                children: [
                  {
                    id: "11",
                    icon: videoIcon,
                    title: "Video: What is speech recognition?",
                    tooltip: {
                      content:
                        "Watch the video to learn more about what speech recognition is.",
                    },
                    children: [
                      {
                        id: "14",
                        icon: quizIcon,
                        title: "Fill in the blank quiz",
                        tooltip: {
                          content:
                            "Time to test your knowledge with this fill in the blank quiz on AI speech recognition!",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                id: "6643514dd953163fd76256c3",
                icon: lessonIcon,
                title: "Natural language processing",
                tooltip: {
                  content: "Lesson on natural language processing.",
                },
                children: [
                  {
                    id: "12",
                    icon: videoIcon,
                    title: "Video: Natural language processing",
                    tooltip: {
                      content:
                        "Watch the video to learn more about what natural language processing is.",
                    },
                    children: [
                      {
                        id: "15",
                        icon: quizIcon,
                        title: "Reorder quiz",
                        tooltip: {
                          content:
                            "Time to test your knowledge with this reorder quiz on natural language processing!",
                        },
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

/*
  Static data for user's progress in the recognising AI learning path
  This will need to be retrieved from the database
*/
export const savedProgressData = {
  //SavedDataType. Note that nodeState can be set to: 'locked' | 'unlocked' | 'selected';
  1: {
    nodeState: "selected",
  },
  2: {
    nodeState: "selected",
  },
  3: {
    nodeState: "selected",
  },
  5: {
    nodeState: "selected",
  },
  7: {
    nodeState: "selected",
  },
};
