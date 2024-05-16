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
        // TODO: query db to get the type of lesson. Can't do it normally because of nested data, so something like "const lessonType = learningPathData.find(item => item.id === "1");" doesnt work

        // HARDCODED FOR NOW
        const videos = ["4", "10", "11", "12"];
        const lessons = [
            "6640555ed3dd29919eec460e",
            "6640516ed3dd29919eec460d",
            "66435798d953163fd76256c4",
            "6643460e6e0276ae96a000b4",
            "66434e8bd953163fd76256c2",
            "6643514dd953163fd76256c3",
        ];
        const quizzes = ["5", "6", "13", "14", "15"];

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
            "http://localhost:3000/" + output + "/:" + node.key;
    };

    return (
        <div style={{ backgroundColor: "#3CA3EE" }}>
            <Menu title={learningPathTitle} subtitle="Learning Path" />{" "}
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
