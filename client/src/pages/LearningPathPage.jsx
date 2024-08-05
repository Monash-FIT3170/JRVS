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
    SkillType,
    SkillGroupDataType,
} from "beautiful-skill-tree";
import { useApi } from '../context/ApiProvider';

// Import hard-coded learning path data
import { savedProgressData } from "./learningPathData.js";
import "../assets/styles/App.css";
import { Box } from "@mui/material";

const LearningPathPage = () => {
    const { getData } = useApi();

    const [learningPathData, setLearningPathData] = useState([]);
    const [learningPathTitle, setLearningPathTitle] = useState([]); // get the title of the learning path unit
    const [isUnitLoading, setIsUnitLoading] = useState(true); // set loading spinner
    
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
        // Map based replacement
        return data.map(item => replaceIconDataRecursive(item));
    }

    // Creates an inconMap to replace with parent child relationships
    const replaceIconDataRecursive = (item) => {
        const iconMap = {
            'lessonIcon': lessonIcon,
            'quizIcon': quizIcon,
            'videoIcon': videoIcon
        };
        item.icon = iconMap[item.icon] || item.icon;
        if (item.children && item.children.length) {
            item.children = item.children.map(child => replaceIconDataRecursive(child));
        }
        return item;
    }

    // Coloured background theme
    const theme = {
        border: "transparent",
        borderRadius: "8px",
        treeBackgroundColor: "#transparent", // Tree background colour //Note it is set to a broken value which makes the popup black
        nodeBackgroundColor: "#646464", // Locked node colour
        nodeActiveBackgroundColor: "#FDC700", // Unlocked node colour
        nodeHoverBorderColor: `#FFFFFF`, // Node border colour
    };

    // Function for handling when a lesson is clicked. Navigate to the corresponding lesson page
    const handleNodeSelect = (node) => {
        // ID of lesson is stored in node.key
        console.log("Node with key '" + node.key + "' selected!");

        // TODO: Popup of some kind? Either find a way to use the tree module or our use our own (Eg use MUI component)

        // Function to find lessons, videos, and quizzes
        // This is a flattened data structure approach that handles each item and all its children in one go,
        // and collects the data during traveral
        const findLessonTypes = (data) => {
            const lessons = [];
            const videos = [];
            const quizzes = [];

            const traverse = (item) => {
                if (item.type === 'lesson') {
                    lessons.push(item.id);
                } else if (item.type === 'video') {
                    videos.push(item.id);
                } else if (item.type === 'quiz') {
                    quizzes.push(item.id);
                }
                if (item.children) {
                    item.children.forEach(child => traverse(child));
                }
            };

            data.forEach(item => traverse(item));
            return { lessons, videos, quizzes };
        };

        const { lessons, videos, quizzes } = findLessonTypes(learningPathData);

        const output = lessons.includes(node.key) ? "lesson" :
                       quizzes.includes(node.key) ? "quiz" :
                       "video";

        navigate(`/${output}/${node.key}`);
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
        </div>
    );
};

export default LearningPathPage;
