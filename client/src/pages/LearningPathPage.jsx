import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from 'beautiful-skill-tree';

// const data = []; //SkillType[]
const data = [
  {
    id: 'hello-world',
    title: 'Hello World',
    tooltip: {
      content:
        'This node is the top most level, and will be unlocked, and ready to be clicked.',
    },
    children: [
      {
        id: 'hello-sun',
        title: 'Hello Sun',
        tooltip: {
          content:
            'This is a parent of the top node, and will locked while the parent isn’t in a selected state.',
        },
        children: [],
      },
      {
        id: 'hello-stars',
        title: 'Hello Stars',
        tooltip: {
          content:
            'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
        },
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
            {({ skillCount }) => (
              <SkillTree
                treeId="first-tree"
                title="Skill Tree"
                data={data}
                // collapsible
                description="My first skill tree"
              />
            )}
          </SkillTreeGroup>
        </SkillProvider>;
    </div>
  );
}

export default LearningPathPage;