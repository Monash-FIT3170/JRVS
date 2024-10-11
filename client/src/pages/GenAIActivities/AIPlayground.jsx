import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useApi } from "../../context/ApiProvider";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/MenuBar";

const AIPlayground = () => {
  const { postData } = useApi();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load messages from local storage when the component mounts
  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    if (storedMessages.length === 0) {
      const initialPrompt =
        "Welcome to the AI Chatbot Playground! How can I assist you today?";
      storedMessages.push({ text: initialPrompt, sender: "ai" });
    }
    setMessages(storedMessages);
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();

    if (!userMessage) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      // Prepare the full conversation history
      const conversationHistory = messages
        .map((msg) => `${msg.sender === "user" ? "User" : "AI"}: ${msg.text}`)
        .join("\n");

      // Create the prompt for the AI
      const prompt = `${conversationHistory}\nUser: ${userMessage}\nAI:`;

      // Call the AI API with the full conversation as the prompt
      const response = await postData("api/gemini/generateText", {
        prompt: `You are an AI Chatbot in a teenagers AI Literacy Application. Reply with under 100 words. ${prompt}`,
      });

      // Add AI's response to the chat
      if (response && response.content) {
        setMessages((prev) => [
          ...prev,
          { text: response.content, sender: "ai" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't respond right now.", sender: "ai" },
      ]);
    } finally {
      setLoading(false); // Set loading to false after the response is handled
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00141a",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar />
      </Box>
      <Typography variant="h4" sx={{ marginTop: "40px", color: "white" }}>
        AI Chatbot Playground
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          width: "75%",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#002b36",
        }}
      >
        <Box
          sx={{
            height: "300px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            width: "100%",
            borderRadius: "10px",
            padding: "10px",
            backgroundColor: "#073642",
            color: "#ffffff", // Set the default text color to white
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.sender === "user" ? "right" : "left",
                color: "#ffffff",
              }}
            >
              <strong style={{ color: "#ffffff" }}>
                {msg.sender === "user" ? "You" : "AI"}:
              </strong>{" "}
              {msg.text}
            </div>
          ))}
          {loading && (
            <div style={{ textAlign: "left", color: "#ffffff" }}>
              <strong>AI:</strong>{" "}
              <CircularProgress
                size={20}
                sx={{ marginLeft: "10px", color: "#ffffff" }}
              />
            </div>
          )}
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            sx={{
              bgcolor: "#073642",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#839496",
                },
                "&:hover fieldset": {
                  borderColor: "#657b83",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#657b83",
                },
              },
              color: "#ffffff", // Text color inside the input field
              "& .MuiInputBase-input": {
                color: "#ffffff", // Text color in input field
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "10px",
              backgroundColor: "#073642",
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#657b83" },
              padding: "10px",
              color: "#ffffff", // Text color on button
            }}
          >
            Send
          </Button>
        </form>
      </Box>
      <Box sx={{ width: "75%", marginTop: "20px", marginBottom: "20px" }}>
        <Tooltip title="Back to Units Page">
          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            sx={{
              backgroundColor: "#073642",
              borderRadius: "10px",
              "&:hover": { bgcolor: "#657b83" },
              padding: "10px",
            }}
          >
            BACK
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AIPlayground;
