/**
 * @file Lessons.js
 * @description This component provides an interface for interacting with lesson content, including text, images, and other types of content. It manages the loading and display of lesson details, tracks user progress through the lesson, and provides navigation options. The component fetches lesson data and user progress from APIs, updates the progress as the user interacts with the lesson, and handles UI states such as loading and completion. It also integrates a carousel for displaying content and a progress bar to indicate lesson completion.
 *
 * @module Lessons
 * @requires Button, Box, LinearProgress from @mui/material
 * @requires styled from @mui/system
 * @requires useState, useEffect from React
 * @requires useParams, useNavigate from react-router-dom
 * @requires TextBox from "../../components/contentTypes/textBox"
 * @requires ListBox from "../../components/contentTypes/listBox.jsx"
 * @requires MultipleImageTextBox from "../../components/contentTypes/multipleImageTextBox.jsx"
 * @requires Carousel from "../../components/content/contentCarousal"
 * @requires ImageTextBox from "../../components/contentTypes/imageTextBox"
 * @requires BotBox from "../../components/content/botBox"
 * @requires useApi from "../../context/ApiProvider.jsx"
 * @requires MenuBar from "../../components/MenuBar.jsx"
 *
 * @example
 * // Example usage:
 * import Lessons from './Lessons';
 *
 * function App() {
 *   return <Lessons />;
 * }
 *
 * @returns {JSX.Element} The rendered interface for interacting with lesson content, including a carousel, progress bar, and navigation buttons.
 */

import React from "react";
import { Button, Box, LinearProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./lessons.css";
import TextBox from "../../components/contentTypes/textBox";
import ListBox from "../../components/contentTypes/listBox.jsx";
import MultipleImageTextBox from "../../components/contentTypes/multipleImageTextBox.jsx";
import Carousel from "../../components/content/contentCarousal";
import ImageTextBox from "../../components/contentTypes/imageTextBox";
import BotBox from "../../components/content/botBox";

import { useApi } from "../../context/ApiProvider.jsx";
import MenuBar from "../../components/MenuBar.jsx";

// eslint-disable-next-line no-unused-vars
const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#FFC93C",
  },
}));

const normalise = (value, min, max) => ((value - min) * 100) / (max - min);

function Lessons() {
  const navigate = useNavigate();

  const { getData, postData, updateData } = useApi();
  const [lesson, setLesson] = useState([]);
  const [isLessonLoading, setIsLessonLoading] = useState(true);
  const { unitId, lessonId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData("api/lessons/" + lessonId);
        setLesson(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData, lessonId]);

  const [hasFinishedCarousel, setHasFinishedCarousel] = useState(false);
  const [onIntroduction, setOnIntroduction] = useState(true);
  const [seenNum, setSeenNum] = useState(1);
  const [lastSectionIndex, setLastSectionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleLessonFinished = async () => {
    try {
      await updateData(`api/userUnitProgress/${unitId}`, {
        newCompletedLessons: [lessonId],
      });
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }

    try {
      console.log("userUnitProgress entry not found, creating a new one...");
      await postData(`api/userUnitProgress/${unitId}`, {
        completedLessons: [lessonId],
      });
      navigate(-1);
    } catch (creationError) {
      console.error("Error creating user progress entry:", creationError);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await postData("api/auth/current", { token });
        console.log(res);
        const responseData = await getData(
          `api/lessonProgress/${res.decoded.id}/${lessonId}`,
        );
        if (responseData.progressNum && responseData.lastSectionIndex) {
          console.log(responseData.lastSectionIndex);
          setLastSectionIndex(responseData.lastSectionIndex);
          setSeenNum(responseData.progressNum);
          setIsCompleted(responseData.isCompleted);
        }
        setIsLessonLoading(false);
      } catch (error) {
        console.log(error);
        setIsLessonLoading(false);
      }
    };
    fetchData();
  }, [getData, postData, lessonId]);

  const handleStatus = (status) => {
    setHasFinishedCarousel(status);
  };

  const handleIntroStatus = (status) => {
    setOnIntroduction(status);
  };

  const handleProgress = async (newSeenNum, newLastSectionIndex) => {
    setSeenNum((currentSeenNum) => {
      return newSeenNum > currentSeenNum ? newSeenNum : currentSeenNum;
    });
    setLastSectionIndex(newLastSectionIndex);

    const token = localStorage.getItem("token");

    try {
      const res = await postData("api/auth/current", { token });
      const userId = res.decoded.id;

      const lessonProgress = {
        userId: userId,
        lessonId: lessonId,
        lastSectionIndex: newLastSectionIndex,
        progressNum: newSeenNum,
        isCompleted: contentBoxes ? newSeenNum >= contentBoxes.length : false,
      };

      await updateData(
        `api/lessonProgress/${userId}/${lessonId}`,
        lessonProgress,
      );
    } catch (error) {
      console.log("Error updating of lesson progress", error);
    }

    try {
      const res = await postData("api/auth/current", { token });
      const userId = res.decoded.id;

      const lessonProgress = {
        userId: userId,
        lessonId: lessonId,
        lastSectionIndex: newLastSectionIndex,
        progressNum: newSeenNum,
        isCompleted: contentBoxes ? newSeenNum >= contentBoxes.length : false,
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await postData(
        `api/lessonProgress/${userId}/${lessonId}`,
        lessonProgress,
      );
    } catch (error) {
      console.log("Error for creation of lesson progress", error);
    }
  };

  //console.log(lesson.content)
  let contentBoxes = () => {
    return <></>;
  };

  if (lesson.content) {
    contentBoxes = lesson.content.map((contentObject, index) => {
      if (contentObject.type === "textBox") {
        return (
          <TextBox
            key={index}
            text={contentObject.text}
            heading={contentObject.heading}
          ></TextBox>
        );
      } else if (contentObject.type === "imageTextBox") {
        return (
          <ImageTextBox
            key={index}
            text={contentObject.text}
            imageSrc={contentObject.imageSrc}
            heading={contentObject.heading}
          ></ImageTextBox>
        );
      } else if (contentObject.type === "listBox") {
        return (
          <ListBox
            key={index}
            points={contentObject.points}
            heading={contentObject.heading}
          ></ListBox>
        );
      } else if (contentObject.type === "multipleImageTextBox") {
        return (
          <MultipleImageTextBox
            key={index}
            imageSrcs={contentObject.imageSrcs}
            heading={contentObject.heading}
            text={contentObject.text}
          ></MultipleImageTextBox>
        );
      } else return <></>;
    });
  }

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#3CA3EE",
      }}
    >
      <Box sx={{ padding: "10px" }}>
        <MenuBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -100,
        }}
      >
        <h1 style={{ paddingBottom: "25px" }} className="title-font">
          {isLessonLoading || !lesson.title
            ? "loading..."
            : lesson.title.toUpperCase()}
        </h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {onIntroduction && lastSectionIndex === 0 ? <BotBox /> : <></>}
          {isLessonLoading ? (
            <p style={{ padding: "10px" }}>loading...</p>
          ) : (
            <Carousel
              boxes={contentBoxes}
              onStatus={handleStatus}
              onIntroduction={handleIntroStatus}
              onSeenNum={handleProgress}
              startingIndex={lastSectionIndex}
            ></Carousel>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "60px",
        }}
      >
        <Button
          onClick={handleBackClick}
          variant="contained"
          className="button-font"
          sx={{
            ":hover": { backgroundColor: "#F7B92C" },
            marginLeft: "60px",
            padding: "15px",
            borderRadius: "15px",
            backgroundColor: "#FFC93C",
          }}
        >
          Back
        </Button>
        <Box sx={{ display: "flex", width: "25%", alignItems: "center" }}>
          <CustomLinearProgress
            sx={{ width: "100%" }}
            variant="determinate"
            value={
              isCompleted ? 100 : normalise(seenNum, 1, contentBoxes.length)
            }
          />
          <h1 style={{ paddingLeft: "10px" }} className="progress-font">
            {isCompleted
              ? 100
              : Math.round(normalise(seenNum, 1, contentBoxes.length))}
            %
          </h1>
        </Box>
        <Button
          onClick={handleLessonFinished}
          variant="contained"
          className="button-font"
          sx={{
            ":hover": { backgroundColor: "#F7B92C" },
            marginRight: "60px",
            padding: "15px",
            borderRadius: "15px",
            backgroundColor: "#FFC93C",
            visibility:
              hasFinishedCarousel || seenNum === contentBoxes.length
                ? "visible"
                : "hidden",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default Lessons;
