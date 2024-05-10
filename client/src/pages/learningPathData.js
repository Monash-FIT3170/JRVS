import quizIcon from '../assets/images/QuizIcon.png';
import lessonIcon from '../assets/images/WrittenLessonIcon.png';
import videoIcon from '../assets/images/VideoIcon.png';

/* 
  Static data for each lesson in the recognising AI learning path
  This will need to be retrieved from the database
  TODO: Add ids for the actual lessons here
*/
export const learningPathData = [ // SkillType
  {
    id: "1",
    icon: lessonIcon,
    title: "Introduction to AI recognition",
    tooltip: {
      content: "Lesson introduction to AI recognition",
    },
    children: [
      {
        id: "2",
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
              content: "Watch the video to learn more about AI recognition in real life.",
            },
            children: [
              {
                id: "6",
                icon: quizIcon,
                title: "Multiple choice quiz",
                tooltip: {
                  content: "Time to test your knowledge with this multiple choice quiz on AI recognition in real life!",
                },
                children: []
              }
            ]
          }
        ]
      },
      {
        id: "3",
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
              content: "Time to test your knowledge with this multiple choice quiz on the different types of AI recognition.",
            },
            children: [
              {
                id: "7",
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
                      content: "Watch the video to learn more about detecting AI generated images.",
                    },
                    children: [
                      {
                        id: "13",
                        icon: quizIcon,
                        title: "Image quiz",
                        tooltip: {
                          content: "Time to test your knowledge with this image quiz on AI image recognition!",
                        },
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                id: "8",
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
                      content: "Watch the video to learn more about what speech recognition is.",
                    },
                    children: [
                      {
                        id: "14",
                        icon: quizIcon,
                        title: "Fill in the blank quiz",
                        tooltip: {
                          content: "Time to test your knowledge with this fill in the blank quiz on AI speech recognition!",
                        },
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                id: "9",
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
                      content: "Watch the video to learn more about what natural language processing is.",
                    },
                    children: [
                      {
                        id: "15",
                        icon: quizIcon,
                        title: "Reorder quiz",
                        tooltip: {
                          content: "Time to test your knowledge with this reorder quiz on natural language processing!",
                        },
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

/*
  Static data for user's progress in the recognising AI learning path
  This will need to be retrieved from the database
*/
export const savedProgressData = { //SavedDataType. Note that nodeState can be set to: 'locked' | 'unlocked' | 'selected';
  '1': {
    nodeState: 'selected',
  },
  '2': {
    nodeState: 'selected',
  },
  '3': {
    nodeState: 'selected',
  },
  '5': {
    nodeState: 'selected',
  },
  '7': {
    nodeState: 'selected',
  },
};