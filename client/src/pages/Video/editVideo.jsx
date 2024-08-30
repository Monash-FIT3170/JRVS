/**
 * @file editVideo.js
 * @description This component allows users to edit the details of a video lesson. It fetches the current video data based on the video ID from the URL parameters and provides a form for updating the video title, URL, and heading. The URL is validated to ensure it is a valid YouTube URL and is formatted correctly for embedding. The component displays error messages if data loading or saving fails and includes a button to save changes.
 *
 * @module editVideo
 * @requires useState, useEffect from React
 * @requires useApi from "../../context/ApiProvider.jsx"
 * @requires MenuBar from "../../components/MenuBar.jsx"
 * @requires Box, Button, TextField, Typography from @mui/material
 * @requires useNavigate, useParams from react-router-dom
 * @requires "./videos.css"
 *
 * @example
 * // Example usage:
 * import editVideo from './editVideo';
 *
 * function App() {
 *   return <editVideo />;
 * }
 *
 * @returns {JSX.Element} The rendered edit video page, including a form to edit video details and a button to save changes.
 */

import React, { useState, useEffect } from "react";
import { useApi } from "../../context/ApiProvider.jsx";
import MenuBar from "../../components/MenuBar.jsx";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditVideo = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [currentHeading, setCurrentHeading] = useState("");
  const [error, setError] = useState("");
  const { getData, updateData } = useApi();
  const navigate = useNavigate();
  const { videoId } = useParams();

  // Fetch video details for editing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getData("api/videos/" + videoId);
        setCurrentTitle(responseData.title);
        setCurrentUrl(responseData.url);
        setCurrentHeading(responseData.heading);
      } catch (error) {
        console.log(error);
        setError("Failed to load video details.");
      }
    };
    fetchData();
  }, [getData, videoId]);

  const validateAndFormatUrl = (url) => {
    const watchUrlPattern =
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+$/;

    const embedUrlPattern = /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+$/;

    if (watchUrlPattern.test(url)) {
      return url.replace("watch?v=", "embed/");
    } else if (embedUrlPattern.test(url)) {
      return url;
    } else {
      setError(
        "Please enter a valid YouTube URL. Example: https://www.youtube.com/watch?v=sQw6y3fh0 or https://www.youtube.com/embed/sQw6y3fh0",
      );
      return null;
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const formattedUrl = validateAndFormatUrl(currentUrl);

    if (!formattedUrl) {
      return;
    }

    try {
      await updateData(`api/videos/${videoId}`, {
        title: currentTitle,
        url: formattedUrl,
        heading: currentHeading,
      });
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.log("Error updating video:", error);
      setError("Failed to update video. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#3CA3EE",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar />
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          backgroundColor: "#3CA3EE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ paddingBottom: "25px", color: "#333" }}
          >
            Edit Video Lesson
          </Typography>
          <form
            onSubmit={saveEdit}
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <TextField
              label="Title"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              required
              sx={{
                marginBottom: "15px",
                width: "100%",
                backgroundColor: "white",
              }}
            />
            <TextField
              label="URL"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              required
              placeholder="e.g., https://www.youtube.com/watch?v=sQw6y3fh0 or https://www.youtube.com/embed/sQw6y3fh0 "
              helperText="Enter a valid YouTube video URL."
              sx={{
                marginBottom: "15px",
                width: "100%",
                backgroundColor: "white",
              }}
            />
            <TextField
              label="Heading"
              value={currentHeading}
              onChange={(e) => setCurrentHeading(e.target.value)}
              required
              multiline
              rows={2}
              sx={{
                marginBottom: "5px",
                width: "100%",
                backgroundColor: "white",
              }}
            />
            {error && (
              <Typography color="error" sx={{ marginBottom: "15px" }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "20px",
                backgroundColor: "#FFC93C",
                ":hover": { backgroundColor: "#2196F3" },
              }}
            >
              Save Video
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditVideo;
