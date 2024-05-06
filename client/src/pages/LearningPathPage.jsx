import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from 'beautiful-skill-tree';

import quizIcon from '../assets/images/QuizIcon.png';
import writtenLessonIcon from '../assets/images/WrittenLessonIcon.png';
import videoIcon from '../assets/images/VideoIcon.png';


const data = [ //SkillType[]
  {
    id: 'hello-world',
    title: 'Hello World',
    tooltip: {
      content:
        'This node is the top most level, and will be unlocked, and ready to be clicked.',
    },
    icon: writtenLessonIcon,
    children: [
      {
        id: 'hello-sun',
        title: 'Hello Sun',
        tooltip: {
          content:
            'This is a parent of the top node, and will locked while the parent isn’t in a selected state.',
        },
        icon: videoIcon,
        children: [],
      },
      {
        id: 'hello-stars',
        title: 'Hello Stars',
        tooltip: {
          content:
            'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
        },
        icon: quizIcon,
        children: [],
      },
    ],
  },
];

const LearningPathPage = () => {
  return (
    <div>
        <LeftSidebar />
        <h2>Learning Path</h2>
        
        <SkillProvider>
          <SkillTreeGroup>
            {({ skillCount }) => ( //SkillGroupDataType
              <SkillTree
                treeId="first-tree"
                title="Skill Tree"
                data={data}
                // collapsible
                //description="My first skill tree"
                //handleNodeSelect -> Triggers when clicked
              />
            )}
          </SkillTreeGroup>
        </SkillProvider>;
    </div>
  );
}

export default LearningPathPage;