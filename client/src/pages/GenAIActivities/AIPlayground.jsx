import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Tooltip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useApi } from "../../context/ApiProvider";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/MenuBar";

const AIPlayground = () => {
  const { postData, updateData } = useApi();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an AI Chatbot in a teenagers AI Literacy Application. Reply with under 100 words. Always encourage the user to first select a category.",
  );
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedOption, setSelectedOption] = useState("default");
  const chatEndRef = useRef(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Load messages from local storage when the component mounts
  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem("chatMessages")) || [];
    if (storedMessages.length === 0) {
      const initialPrompt =
        "Welcome to the AI Chatbot Playground! Feel free to select a category above and start talking to different AIs!";
      storedMessages.push({ text: initialPrompt, sender: "ai" });
    }
    setMessages(storedMessages);
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));

    // Scroll to the bottom whenever messages change
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
        prompt: `${systemPrompt} ${prompt}`,
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

  // Function to handle system prompt change
  const handlePromptChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue === "custom") {
      // Clear custom prompt field when switching to custom
      setCustomPrompt("");
    } else {
      // Define the predefined prompts
      const prompts = {
        teacher:
          "You are an AI teacher for an AI Literacy Application targeted at teenagers. Reply with under 100 words.",
        dnd: "You are a game master for a game of dungeon and dragons. Lead the user into a magical journey. Reply with under 100 words.",
        chef: "You are a master chef. Reply with under 100 words to try and help the user. Remember to stay in character and only answer relevant questions.",
        fitness:
          "You are a fitness trainer. Reply with under 100 words to motivate the user or to help the user in any fitness issues.",
      };
      setSystemPrompt(prompts[selectedValue]);
    }
  };

  // Function to handle custom prompt input change
  const handleCustomPromptChange = (event) => {
    setCustomPrompt(event.target.value);
  };

  // Function to save custom prompt
  const saveCustomPrompt = () => {
    setSystemPrompt(customPrompt); // Set the custom prompt
    setFeedbackMessage("Prompt saved"); // Set feedback message
    setTimeout(() => setFeedbackMessage(""), 2000); // Clear message after 2 seconds
  };

  // Function to reset the conversation
  const resetConversation = () => {
    setMessages([]); // Clear messages
    setInput(""); // Clear input field
    localStorage.removeItem("chatMessages"); // Optionally clear local storage
  };

  const handleFinish = async () => {
    try {
      await updateData(`api/userUnitProgress/66a373b0dc35a50ef9c2e43c`, {
        newCompletedLessons: ["playground"],
      });
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }

    try {
      console.log("userUnitProgress entry not found, creating a new one...");
      await postData(`api/userUnitProgress/66a373b0dc35a50ef9c2e43c`, {
        completedLessons: ["playground"],
      });
      navigate(-1);
    } catch (creationError) {
      console.error("Error creating user progress entry:", creationError);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00141a",
        overflowY: "auto", // Enables vertical scrolling
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", position: "relative", zIndex: 10 }}>
        <MenuBar />
      </Box>

      <Typography variant="h4" sx={{ marginTop: "40px", color: "white" }}>
        AI Chatbot Playground
      </Typography>

      {/* Dropdown for selecting the system prompt */}
      <FormControl sx={{ margin: "20px", width: "75%" }}>
        <InputLabel sx={{ color: "#ffffff" }}>Select AI Chatbot</InputLabel>
        <Select
          value={selectedOption}
          onChange={handlePromptChange}
          sx={{
            bgcolor: "#073642",
            color: "#ffffff",
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
          }}
        >
          <MenuItem value="teacher">AI Teacher</MenuItem>
          <MenuItem value="dnd">DnD Game Master</MenuItem>
          <MenuItem value="chef">Master Chef</MenuItem>
          <MenuItem value="fitness">Fitness Trainer</MenuItem>
          <MenuItem value="custom">Custom Prompt</MenuItem>
        </Select>
      </FormControl>

      {selectedOption === "custom" && (
        <TextField
          variant="outlined"
          value={customPrompt}
          onChange={handleCustomPromptChange}
          placeholder="Enter your custom system prompt..."
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
            color: "#ffffff",
            "& .MuiInputBase-input": {
              color: "#ffffff",
            },
            marginTop: "20px",
            width: "75%",
          }}
        />
      )}

      {selectedOption === "custom" && (
        <Button
          variant="contained"
          onClick={saveCustomPrompt}
          sx={{
            marginTop: "10px",
            backgroundColor: "#073642",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#657b83" },
            padding: "10px",
            color: "#ffffff",
          }}
        >
          Save Custom Prompt
        </Button>
      )}
      {feedbackMessage && (
        <Typography
          variant="body1"
          sx={{ color: "#ffffff", marginTop: "10px" }}
        >
          {feedbackMessage}
        </Typography>
      )}
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
          <div ref={chatEndRef} />
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
        <Button
          onClick={resetConversation}
          variant="outlined"
          sx={{
            marginTop: "10px",
            borderColor: "#657b83",
            color: "#ffffff",
            "&:hover": { borderColor: "#657b83", backgroundColor: "red" },
          }}
        >
          Reset Conversation
        </Button>
      </Box>
      <Box sx={{ width: "75%", marginTop: "20px", marginBottom: "20px" }}>
        <Tooltip title="Back to Units Page">
          <Button
            onClick={() => handleFinish()}
            variant="contained"
            sx={{
              backgroundColor: "#073642",
              borderRadius: "10px",
              "&:hover": { bgcolor: "#657b83" },
              padding: "10px",
              color: "#ffffff",
            }}
          >
            Back
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default AIPlayground;
