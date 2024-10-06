/**
 * @file videos.js
 * @description This component displays a video player with associated metadata, including the video title and heading. It fetches video data based on the video ID from the URL parameters and shows a loading state while the data is being fetched. It also includes a button to navigate back to the previous page.
 *
 * @module videos
 * @requires useApi from ../../context/ApiProvider.jsx
 * @requires MenuBar from ../../components/MenuBar.jsx
 * @requires VideoBox from ../../components/videoComponents/videoBox.jsx
 * @requires Box, Button from @mui/material
 * @requires useState, useEffect from React
 * @requires useNavigate, useParams from react-router-dom
 * @requires "./videos.css"
 *
 * @example
 * // Example usage:
 * import Videos from './videos';
 *
 * function App() {
 *   return <videos />;
 * }
 *
 * @returns {JSX.Element} The rendered video page, including the video player, title, and navigation button.
 */

import React from "react";
import { useApi } from "../../context/ApiProvider.jsx";
import MenuBar from "../../components/MenuBar.jsx";
import VideoBox from "../../components/videoComponents/videoBox.jsx";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./videos.css";

function Videos() {
  const navigate = useNavigate();
  const { getData, postData, updateData } = useApi();
  const [video, setVideo] = useState([]);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const { unitId, videoId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData("api/videos/" + videoId);
        setVideo(responseData);
        setIsVideoLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData, videoId]);

  const handleFinishVideo = async () => {
    try {
      await updateData(`api/userUnitProgress/${unitId}`, {
        newCompletedLessons: [videoId],
      });
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }

    try {
      console.log("userUnitProgress entry not found, creating a new one...");
      await postData(`api/userUnitProgress/${unitId}`, {
        completedLessons: [videoId],
      });
      navigate(-1);
    } catch (creationError) {
      console.error("Error creating user progress entry:", creationError);
    }
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
          {isVideoLoading ? "loading..." : video.title.toUpperCase()}
        </h1>
        <h1 style={{ paddingBottom: "25px" }} className="video-heading-font">
          {isVideoLoading ? "loading..." : video.heading}
        </h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isVideoLoading ? (
            <p style={{ padding: "10px" }}>loading...</p>
          ) : (
            <VideoBox url={video.url} />
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
          onClick={handleFinishVideo}
          variant="contained"
          className="button-font"
          sx={{
            ":hover": { backgroundColor: "#2196F3" },
            marginLeft: "60px",
            padding: "15px",
            borderRadius: "15px",
            backgroundColor: "#FFC93C",
          }}
        >
          RETURN TO LEARNING PATH
        </Button>
      </Box>
    </Box>
  );
}

export default Videos;
