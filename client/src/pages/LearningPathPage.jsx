import React, { useEffect, useState } from "react";
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

    // TODO: unit id hardcoded for now
    const unitId = '6644a3eca92b3c9ccb9e33d8' // would need to get lesson id from path map node

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
        } else if (quizzes.includes(node.key)) {
            output = "quiz";
        }
        else {output = "video";} // NOTE: BUG IDENTIFIED: there was a bug where the video for recognising AI in real life was not found to be video. Instead output is undefined. Changed this for the demo.

        // console.log("http://localhost:3000/" + output + "/:" + node.key)

        window.location.href =
            "http://localhost:3000/" + output + "/" + node.key;
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
