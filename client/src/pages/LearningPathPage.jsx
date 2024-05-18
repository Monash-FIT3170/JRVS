import React, { useEffect, useState } from "react";
import Menu from "../components/MenuBar.jsx";

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

    // TODO: unit id hardcoded for now
    const unitId = '6644a3eca92b3c9ccb9e33d8' // would need to get lesson id from path map node

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseData = await getData("api/units/" + unitId);
                setLearningPathData(responseData.data);
                setIsUnitLoading(false);

                setLearningPathTitle(responseData.title);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getData]);

    // Coloured background theme
    const theme = {
        border: "transparent",
        borderRadius: "8px",
        treeBackgroundColor: "#transparent", // Tree background colour //Note it is set to a broken value which makes the popup black
        nodeBackgroundColor: "#646464", // Locked node colour
        nodeActiveBackgroundColor: "#A366FF", // Unlocked node colour
        nodeHoverBorderColor: `#FFFFFF`, // Node border colour
    };

    // TODO: Retrieve learning path data from database, rather than it being hard-coded
    // TODO: Retreive user's progress from database, rather than it being hard-coded

    // Function for handling when a lesson is clicked
    const handleNodeSelect = (node) => {
        // ID of lesson is stored in node.key
        console.log("Node with key '" + node.key + "' selected!");

        // TODO: Popup of some kind? Either find a way to use the tree module or our use our own (Eg use MUI component)
        // TODO: Navigate to that lesson's page, using the id retrieved here

        // alert("Hello! The lesson selected is " + node.key);

        // Go straight to the lesson

        // Function to recursively find lessons, videos, and quizzes
        const findLessonTypes = (data) => {
            const lessons = [];
            const videos = [];
            const quizzes = [];

            if (Array.isArray(data)) {
            for (let item of data) {
                const { lessons: itemLessons, videos: itemVideos, quizzes: itemQuizzes } = findLessonTypes(item);
                lessons.push(...itemLessons);
                videos.push(...itemVideos);
                quizzes.push(...itemQuizzes);
            }
            // Checks what the data type is, appends to appropriate array
            } else if (typeof data === 'object' && data !== null) {
            if (data.type === 'lesson') {
                lessons.push(data.id);
            } else if (data.type === 'video') {
                videos.push(data.id);
            } else if (data.type === 'quiz') {
                quizzes.push(data.id);
            }

            if (data.children) {
                const { lessons: childLessons, videos: childVideos, quizzes: childQuizzes } = findLessonTypes(data.children);
                lessons.push(...childLessons);
                videos.push(...childVideos);
                quizzes.push(...childQuizzes);
            }
            }

            return { lessons, videos, quizzes };
        };

         // Find all lesson, video, and quiz ids in the learning path data
        const { lessons, videos, quizzes } = findLessonTypes(learningPathData);
        // console.log('Lesson IDs:', lessons);
        // console.log('Video IDs:', videos);
        // console.log('Quiz IDs:', quizzes);

        // Checks with node key is in the array
        var output;
        if (lessons.includes(node.key)) {
            output = "lesson";
        } else if (videos.includes(node.key)) {
            output = "video";
        } else if (quizzes.includes(node.key)) {
            output = "quiz";
        }

        // console.log("http://localhost:3000/" + output + "/:" + node.key)

        window.location.href =
            "http://localhost:3000/" + output + "/" + node.key;
    };

    return (
        <div style={{ backgroundColor: "#3CA3EE" }}>
            <Box sx={{padding: '10px'}}><Menu title={learningPathTitle} subtitle="Learning Path" /></Box>{" "}
            {/* TODO: Have the page title match what is stored in the DB */}
            {/* {document.body.style = 'background: red;'} */}
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
