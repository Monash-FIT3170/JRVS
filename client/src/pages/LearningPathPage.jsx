/**
 * @file LearningPathPage.jsx
 * @description This component renders the learning path page for the application. It displays a skill tree with nodes representing lessons, quizzes, and videos. Users can interact with the tree to view, insert, append, edit, or delete nodes, depending on their user type. The component also includes various popups for managing lessons and types.
 *
 * @module LearningPathPage
 * @requires React
 * @requires useParams and useNavigate from 'react-router-dom'
 * @requires Menu from '../components/MenuBar.jsx'
 * @requires quizIcon, lessonIcon, videoIcon from '../assets/images'
 * @requires SkillTreeGroup, SkillTree, SkillProvider from 'beautiful-skill-tree'
 * @requires useApi from '../context/ApiProvider'
 * @requires UnitPopup from '../components/UnitPopup.jsx'
 * @requires LessonTypesPopup from '../components/LessonTypesPopup.jsx'
 * @requires Box from '@mui/material'
 * @requires App.css for styling
 *
 * @component
 * @example
 * <LearningPathPage />
 *
 * @returns {JSX.Element} The Learning Path Page component
 */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Menu from "../components/MenuBar.jsx";
import quizIcon from "../assets/images/QuizIcon.png";
import lessonIcon from "../assets/images/WrittenLessonIcon.png";
import videoIcon from "../assets/images/VideoIcon.png";

import { SkillTreeGroup, SkillTree, SkillProvider } from "beautiful-skill-tree";
import { useApi } from "../context/ApiProvider";

import "../assets/styles/App.css";
import { Box } from "@mui/material";
import UnitPopup from "../components/UnitPopup.jsx";
import LessonTypesPopup from "../components/LessonTypesPopup.jsx";

// Coloured background theme
const theme = {
  border: "transparent",
  borderRadius: "8px",
  treeBackgroundColor: "#transparent", // Tree background colour //Note it is set to a broken value which makes the popup black
  nodeBackgroundColor: "#646464", // Locked node colour
  nodeActiveBackgroundColor: "#FDC700", // Unlocked node colour
  nodeHoverBorderColor: `#FFFFFF`, // Node border colour
};

const LearningPathPage = () => {
  const { getData, postData } = useApi();
  const navigate = useNavigate();

  const [learningPathData, setLearningPathData] = useState([]);
  const [savedData, setSavedData] = useState();
  const [completedLessonsArray, setCompletedLessonsArray] = useState();
  const [learningPathTitle, setLearningPathTitle] = useState([]); // get the title of the learning path unit
  const [isUnitLoading, setIsUnitLoading] = useState(true); // set loading spinner

  const [selectedNode, setSelectedNode] = useState(null); // State for the selected node
  const [isModalOpen, setIsPopupOpen] = useState(false); // State for popup open/close
  const [isInsertLessonTypeModalOpen, setIsInsertLessonTypeModalOpen] =
    useState(false);
  const [isAppendLessonTypeModalOpen, setIsAppendLessonTypeModalOpen] =
    useState(false);

  const { unitId } = useParams();

  const [usertype, setUserType] = useState(); // User type
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitResponseData = await getData("api/units/" + unitId);
        const dataWithIcons = replaceIconData(unitResponseData.data);
        setLearningPathData(dataWithIcons);
        setLearningPathTitle(unitResponseData.title);
      } catch (error) {
        console.log(error);
        setIsUnitLoading(false);
      }
    };
    // Get user type to determine whether to offer add/edit/delete buttons
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await postData("api/auth/current", { token });
        setUserId(res.decoded.id);
        const userData = await getData(`api/users/id/${userId}`);
        setUserType(userData.usertype);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    fetchData();
  });

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        if (usertype === undefined) {
          return;
        }
        var completedLessons = await getCompletedLessonsArray();
        setCompletedLessonsArray(completedLessons);
        var completedLessonsObject = {};
        completedLessons.forEach((lessonId) => {
          completedLessonsObject[lessonId] = {
            optional: false,
            nodeState: "selected",
          };
        });
        setSavedData(completedLessonsObject);
      } catch (error) {
        console.log(error);
        setIsUnitLoading(false);
      }
    };
    loadSavedData();
  });

  useEffect(() => {
    const dataDoneLoading = async () => {
      if (savedData && completedLessonsArray) {
        // handleSave(localStorage, "learning-pathway", savedData);
        setIsUnitLoading(false);
      }
    };
    dataDoneLoading();
  }, [savedData, completedLessonsArray]);

  // Functions to assign icon images in the directory to learningPathData
  const replaceIconData = (data) => {
    for (let item of data) {
      item = replaceIconDataRecursive(item);
    }
    return data;
  };

  const replaceIconDataRecursive = (item) => {
    if (item.icon === "lessonIcon") {
      item.icon = lessonIcon;
    } else if (item.icon === "quizIcon") {
      item.icon = quizIcon;
    } else if (item.icon === "videoIcon") {
      item.icon = videoIcon;
    }
    if (item.children.length !== 0) {
      for (let i = 0; i < item.children.length; i++) {
        item.children[i] = replaceIconDataRecursive(item.children[i]);
      }
    }
    return item;
  };

  // Function for handling when a lesson is clicked. Retrieve the details of the node and display a popup.
  const handleNodeSelect = (node) => {
    // ID of lesson is stored in node.key
    // console.log("Node with key '" + node.key + "' selected!");

    // Retrieve current node details for the popup
    var currentNode = findSelectedNode(learningPathData, node.key);

    // Store current node for popup
    setSelectedNode(currentNode);
    setIsPopupOpen(true);
  };

  // Recursive function to find the details of the selected node
  const findSelectedNode = (tree, id) => {
    for (const node of tree) {
      if (node.id === id) {
        return {
          id: node.id,
          type: node.type,
          title: node.title,
          content: node.tooltip ? node.tooltip.content : null,
        };
      } else if (node.children && node.children.length > 0) {
        const result = findSelectedNode(node.children, id);
        if (result) {
          return result;
        }
      }
    }
    return null; // Return null if the id is not found
  };

  const handlePopupClose = () => {
    // Close the popup
    setIsPopupOpen(false);
    setSelectedNode(null);
  };

  const handleLessonTypePopupClose = () => {
    setIsInsertLessonTypeModalOpen(false);
    setIsAppendLessonTypeModalOpen(false);
  };

  const handleInsertNewLessonType = () => {
    setIsInsertLessonTypeModalOpen(true);
  };

  const handleAppendNewLessonType = () => {
    setIsAppendLessonTypeModalOpen(true);
  };

  const navigateToEditPage = (inputType, inputSubType, id, unitId) => {
    if (inputType === "lesson") {
      window.location.href = `/edit/${unitId}/${id}`; // .../edit/lessonId
    } else if (inputType === "video") {
      window.location.href = `/video/edit/${unitId}/${id}`; // .../video/edit/:videoId
    } else if (inputType === "quiz") {
      if (inputSubType === "Image" || inputSubType === "ImageQuiz")
        window.location.href = `/quiz/imagequiz/edit/${unitId}/${id}`; // .../quiz/imagequiz/edit/:quizId
      else if (inputSubType === "ShortAnswer")
        window.location.href = `/quiz/short-answer/edit/${unitId}/${id}`; // .../quiz/imagequiz/edit/:quizId
      else if (inputSubType === "TrueFalse")
        window.location.href = `/quiz/truefalse/edit/${unitId}/${id}`; // .../quiz/truefalse/edit/:quizId
      else if (inputSubType === "MultipleChoice")
        window.location.href = `/quiz/multiplechoice/edit/${unitId}/${id}`; // .../quiz/multiplechoice/edit/:quizId
      else if (inputSubType === "Reorder")
        window.location.href = `/quiz/reorder/edit/${unitId}/${id}`; // .../quiz/reorder/edit/:quizId
      else if (inputSubType === "DragAndDrop")
        window.location.href = `/quiz/drag-drop/edit/${unitId}/${id}`; // .../quiz/drag-drop/edit/:quizId
      else alert(`Quiz sub-type '${inputSubType}' cannot be edited.`);
    }
  };

  const handlePopupInsert = async (inputType, inputSubType) => {
    // Handle an insert of child. A new node should be inserted between this node and its children
    const targetNodeId = selectedNode.id;

    // New node object with placeholder values
    const newNode = {
      icon: `${inputType}Icon`,
      title: `New ${inputType}`,
      tooltip: { content: "Description of the new child node" },
      children: [],
      type: inputType,
    };

    try {
      const response = await postData(`api/units/${unitId}/insert`, {
        unitId,
        targetNodeId,
        newNode,
        inputSubType,
      });
      console.log(response);

      // Navigate to the edit the page
      navigateToEditPage(inputType, inputSubType, response.newNode.id, unitId);
    } catch (error) {
      console.log(error);
    }
  };

  async function handlePopupAppend(inputType, inputSubType) {
    // Handle an append of a child. A new node should be added to this nodes's children
    const targetNodeId = selectedNode.id;

    // New node object with placeholder values
    const newNode = {
      icon: `${inputType}Icon`,
      title: `New ${inputType}`,
      tooltip: { content: "Description of the new child node" },
      children: [],
      type: inputType,
    };

    try {
      const response = await postData(`api/units/${unitId}/append`, {
        unitId,
        targetNodeId,
        newNode,
        inputSubType,
      });
      console.log(response);

      // Navigate to the edit the page
      navigateToEditPage(inputType, inputSubType, response.newNode.id, unitId);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePopupEdit = async () => {
    // Handle an editing of a node. Navigate to the edit page
    if (selectedNode.type !== "quiz") {
      // Navigate to the lesson/video edit page
      navigateToEditPage(selectedNode.type, null, selectedNode.id, unitId);
    }

    // Retrieve the quiz sub-type
    try {
      // const response = await getData('api/quizzes/subtype/' + selectedNode.id);
      const response = await getData("api/quizzes/" + selectedNode.id);
      console.log(response);

      // Navigate to the edit the page
      navigateToEditPage(
        selectedNode.type,
        response.questions[0].type,
        selectedNode.id,
        unitId,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopupDelete = async () => {
    if (!selectedNode) return;

    // confirming deletion of node using window
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this node? Its children will be reappended to the parent node. This action cannot be undone.",
    );

    if (isConfirmed) {
      try {
        const response = await postData(`api/units/${unitId}/delete`, {
          unitId,
          nodeId: selectedNode.id,
        });

        console.log(response);

        // close the popup
        setIsPopupOpen(false);
        setSelectedNode(null);

        // refresh the page to show updated structure
        navigate(0);
      } catch (error) {
        console.error("Error deleting node:", error);
        alert("An error occurred while deleting the node. Please try again.");
      }
    }
  };

  const getCompletedLessonsArray = async () => {
    try {
      if (usertype === "teacher" || usertype === "admin") {
        return await getData(`api/units/${unitId}/unlockedTreeData`);
      } else {
        const userProgressResponseData = await getData(
          `api/userUnitProgress/${unitId}`,
        );
        if (userProgressResponseData.completedLessons) {
          return userProgressResponseData.completedLessons;
        }
      }

      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  async function handleSave(storage, treeId, skills) {
    var completedLessons = [];
    if (completedLessonsArray) {
      completedLessons = completedLessonsArray;
    } else {
      completedLessons = await getCompletedLessonsArray();
    }
    completedLessons.forEach((lessonId) => {
      skills[lessonId] = {
        optional: false,
        nodeState: "selected",
      };
    });
    for (const lesson in skills) {
      if (
        !completedLessons.includes(lesson) &&
        skills[lesson].nodeState === "selected"
      ) {
        skills[lesson].nodeState = "unlocked";
      }
    }

    return storage.setItem(`skills-${treeId}`, JSON.stringify(skills));
  }

  return (
    <div style={{ backgroundColor: "#3CA3EE", minHeight: "100vh" }}>
      <Box sx={{ padding: "10px" }}>
        <Menu title={learningPathTitle} subtitle="Learning Path" />
      </Box>{" "}
      {isUnitLoading ? (
        <div className="spinner"></div>
      ) : (
        <SkillProvider>
          <SkillTreeGroup theme={theme}>
            {(
              { skillCount }, //SkillGroupDataType
            ) => (
              <SkillTree
                treeId="learning-pathway"
                title=""
                data={learningPathData} // SkillType
                // Other useful fields (the rest we won't need):
                savedData={savedData}
                handleNodeSelect={handleNodeSelect} // To trigger an action when a lesson is clicked
                handleSave={handleSave}
              />
            )}
          </SkillTreeGroup>
        </SkillProvider>
      )}
      <UnitPopup
        unitId={unitId}
        isOpen={isModalOpen}
        node={selectedNode}
        onClose={handlePopupClose}
        onInsert={handleInsertNewLessonType}
        onAppend={handleAppendNewLessonType}
        onEdit={handlePopupEdit}
        onDelete={handlePopupDelete}
        isAdmin={usertype === "admin"} // Check the current user's type
      />
      <LessonTypesPopup
        isOpen={isInsertLessonTypeModalOpen}
        onClose={handleLessonTypePopupClose}
        onClick={handlePopupInsert}
      />
      <LessonTypesPopup
        isOpen={isAppendLessonTypeModalOpen}
        onClose={handleLessonTypePopupClose}
        onClick={handlePopupAppend}
      />
    </div>
  );
};

export default LearningPathPage;
