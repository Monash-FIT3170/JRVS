import React from 'react';
import LeftSidebar from '../components/LeftSidebar';
import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
} from 'beautiful-skill-tree';

// Import hard-coded learning path data
import { learningPathData, savedProgressData } from './learningPathData.js';

const LearningPathPage = () => {

  // TODO: Retrieve learning path data from database, rather than it being hard-coded
  // TODO: Retreive user's progress from database, rather than it being hard-coded

  // Function for handling when a lesson is clicked
  const handleNodeSelect = (node) => {
    // ID of lesson is stored in node.key
    console.log("Node with key '" + node.key + "' selected!")

    // TODO: Popup of some kind? Either find a way to use the tree module or our use our own (Eg use MUI component)
    // TODO: Navigate to that lesson's page, using the id retrieved here

    // alert("Hello! The lesson selected is " + node.key);
  }

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
                data={learningPathData} // SkillType

                // Other useful fields (the rest we won't need):
                savedData={savedProgressData} // To load user progress
                handleNodeSelect={handleNodeSelect} // To trigger an action when a lesson is clicked
              />
            )}
          </SkillTreeGroup>
        </SkillProvider>;

    </div>
  );
}

export default LearningPathPage;