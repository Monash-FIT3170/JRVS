import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Menu from "../components/MenuBar.jsx";
import quizIcon from '../assets/images/QuizIcon.png';
import lessonIcon from '../assets/images/WrittenLessonIcon.png';
import videoIcon from '../assets/images/VideoIcon.png';

import {
    SkillTreeGroup,
    SkillTree,
    SkillProvider,
} from "beautiful-skill-tree";
import { useApi } from '../context/ApiProvider';

import "../assets/styles/App.css";
import { Box } from "@mui/material";
import UnitPopup from "../components/UnitPopup.jsx";

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

    const [learningPathData, setLearningPathData] = useState([]);
    const [learningPathTitle, setLearningPathTitle] = useState([]); // get the title of the learning path unit
    const [isUnitLoading, setIsUnitLoading] = useState(true); // set loading spinner

    const [selectedNode, setSelectedNode] = useState(null); // State for the selected node
    const [isModalOpen, setIsPopupOpen] = useState(false); // State for popup open/close
    
    const { unitId } = useParams();

    // TODO: Retrieve user's progress from database, rather than it being hard-coded

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getData("api/units/" + unitId);
                const dataWithIcons = replaceIconData(responseData.data);
                setLearningPathData(dataWithIcons);
                setIsUnitLoading(false);

                setLearningPathTitle(responseData.title);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getData]);

    // Functions to assign icon images in the directory to learningPathData
    const replaceIconData = (data) => {
        for (let item of data) {
            item = replaceIconDataRecursive(item);
        }
        return data;
    }

    const replaceIconDataRecursive = (item) => {
        if (item.icon === "lessonIcon"){
            item.icon = lessonIcon;
        } else if (item.icon === "quizIcon"){
            item.icon = quizIcon;
        } else if (item.icon === "videoIcon"){
            item.icon = videoIcon;
        }
        if (item.children.length !== 0) {
            for (let i = 0; i<item.children.length; i++){
                item.children[i] = replaceIconDataRecursive(item.children[i])
            }
        }
        return item;
    }

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
                    content: node.tooltip ? node.tooltip.content : null
                };
            }
            else if (node.children && node.children.length > 0) {
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

    const handlePopupInsert = () => {
        // TODO: Handle an insert of child. A new node should be inserted between this node and its children
    };

    async function handlePopupAppend() {
        // TODO: Handle an append of a child. A new node should be added to this nodes's children
        const input1 = '66a373b0dc35a50ef9c2e43c'
        const input2 = 'blah2'
        var response1;
        try {
            response1 = await postData(`api/units/${unitId}/append`, { input1, input2 });
        } catch (error) {
            console.log(error);
        }
        console.log(response1)
    };

    const handlePopupEdit = () => {
        // Handle an editing of a node. Navigate to the edit page
        //window.location.href = `http://localhost:3000/${selectedNode.id}/edit`;

        // Redirect based on the lesson type. Either /editLesson, /editVideo or /editQuiz
        const nodeType = selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1); // Make first letter uppercase
        window.location.href = `http://localhost:3000/${selectedNode.id}/edit${nodeType}`;
    };

    const handlePopupDelete = () => {
        // TODO: Handle a delete of a node. 
    };
    

    return (
        <div style={{ backgroundColor: "#3CA3EE" }}>
            <Box sx={{padding: '10px'}}><Menu title={learningPathTitle} subtitle="Learning Path" /></Box>{" "}
            {isUnitLoading ? (
                <div className="spinner"></div>
            ) : (
                <SkillProvider>
                    <SkillTreeGroup theme={theme}>
                        {(
                            { skillCount } //SkillGroupDataType
                        ) => (
                            <SkillTree
                                treeId="first-tree"
                                title=""
                                data={learningPathData} // SkillType
                                // Other useful fields (the rest we won't need):
                                // savedData={savedProgressData} // To load user progress
                                handleNodeSelect={handleNodeSelect} // To trigger an action when a lesson is clicked
                            />
                        )}
                    </SkillTreeGroup>
                </SkillProvider>
            )}
        
            <UnitPopup 
                isOpen={isModalOpen} 
                node={selectedNode} 
                onClose={handlePopupClose} 
                onInsert={handlePopupInsert} 
                onAppend={handlePopupAppend} 
                onEdit={handlePopupEdit} 
                onDelete={handlePopupDelete} 
                isAdmin={true} // Assume current user is admin. TODO: Check the current user's type
            />

        </div>
    );
};

export default LearningPathPage;
