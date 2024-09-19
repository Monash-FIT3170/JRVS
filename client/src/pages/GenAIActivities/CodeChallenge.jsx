import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { useApi } from "../../context/ApiProvider";
import MenuBar from "../../components/MenuBar";
import React, { useState } from "react";
import TypewriterComponent from "typewriter-effect";
import AceEditor from "react-ace";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";
const languages = [
  "jsx",
  "java",
  "python",
  "typescript",
  "ruby",
  "rust",
  "c_cpp",
];
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

const CodeChallenge = () => {
  const { postData } = useApi();
  const [generatedResult, setGeneratedResult] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [codeChallenge, setCodeChallenge] = useState("");
  const [codeChallengeKey, setCodeChallengeKey] = useState(0);
  const [resultKey, setResultKey] = useState(0);
  const [codeMode, setCodeMode] = useState("python");

  // generate result from code input
  const genResult = async () => {
    try {
      const response = await postData(`api/gemini/generateText`, {
        prompt: `Based on the challenge: ${codeChallenge}, evaluate my answer: ${codeInput}, and give me a score out of 100, in under 200 words. And if my answer given above is not code, tell me (and you don't need to give me a score if this is the case).`,
      });
      setResultKey((prevKey) => prevKey + 1);
      setGeneratedResult(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  // generate a coding challenge from gemini ai
  const genCodeChallenge = async () => {
    try {
      const response = await postData(`api/gemini/generateText`, {
        prompt:
          "Can you give me a small basic code challenge to do that is fun and a good learning experience? (under 100 words)",
      });
      setCodeChallengeKey((prevKey) => prevKey + 1);
      setCodeChallenge(response.content);
      setGeneratedResult("");
    } catch (error) {
      console.log(error);
    }
  };

  // get hint from gemini ai
  const genHint = async () => {
    try {
      const response = await postData(`api/gemini/generateText`, {
        prompt: `Based on the challenge ${codeChallenge}, and my current answer: ${codeInput}, can you give me a couple hints on what I need to do to complete the challenge, even if my answer is nothing so far, but make sure that I give you a coding challenge. (under 100 words)`,
      });
      setResultKey((prevKey) => prevKey + 1);
      setGeneratedResult(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (newValue) => {
    setCodeInput(newValue);
  };

  const handleModeChange = (event) => {
    setCodeMode(event.target.value);
  };

  const renderShortenedValue = (value) => {
    if (value.length > 3) return value.slice(0, 3);
    return value;
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#00141a",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginTop: "40px", color: "white" }}>
          Code Challenge using Gemini AI
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Box sx={{ display: "flex", width: "75%" }}>
            <Tooltip title="Generate Code Challenge With Gemini AI">
              <Button
                variant="contained"
                disableElevation
                sx={{
                  height: "fit-content",
                  bgcolor: "#073642",
                  padding: "10px",
                  borderRadius: "10px",
                  "&:hover": { bgcolor: "#657b83" },
                }}
                onClick={() => genCodeChallenge()}
              >
                <AutoModeOutlinedIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                />
              </Button>
            </Tooltip>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Box
                borderRadius="10px"
                p={5}
                sx={{
                  backgroundColor: "#002b36",
                  width: "100%",
                  color: "#839496",
                  marginLeft: "5px",
                }}
              >
                {codeChallenge ? (
                  <TypewriterComponent
                    key={codeChallengeKey}
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(0.01)
                        .typeString(codeChallenge)
                        .pauseFor(2500)
                        .start();
                    }}
                  />
                ) : (
                  <TypewriterComponent
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(0.01)
                        .typeString(
                          "Get a new coding challenge from Gemini AI to start!",
                        )
                        .pauseFor(2500)
                        .start();
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Box sx={{ display: "flex", width: "75%" }}>
            <FormControl
              size="small"
              variant="standard"
              sx={{
                padding: "5px",
                bgcolor: "#073642",
                height: "fit-content",
                borderRadius: "10px",
                marginRight: "5px",
              }}
            >
              <InputLabel
                sx={{
                  margin: "5px",
                  color: "white",
                  "&.Mui-focused": { color: "white" },
                }}
              >
                Language
              </InputLabel>
              <Select
                value={codeMode}
                renderValue={renderShortenedValue}
                onChange={handleModeChange}
                sx={{ color: "#839496", padding: "5px" }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#002b36",
                      "& .MuiMenuItem-root": {
                        color: "white",
                        bgcolor: "#073642",
                      },
                      "& .MuiMenuItem-root:hover": {
                        bgcolor: "#073642",
                      },
                      "& .MuiMenuItem-root:not(.Mui-selected)": {
                        bgcolor: "#002b36",
                      },
                      "& .MuiMenuItem-root:not(.Mui-selected):hover": {
                        bgcolor: "#073642",
                      },
                    },
                  },
                }}
              >
                {languages.map((lang) => (
                  <MenuItem value={lang} sx={{ bgcolor: "#839496" }}>
                    {lang}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <AceEditor
                maxLines={20}
                minLines={20}
                mode={codeMode}
                theme="solarized_dark"
                value={codeInput}
                onChange={handleInputChange}
                editorProps={{ $blockScrolling: true }}
                highlightActiveLine={true}
                setOptions={{
                  enableLiveAutocompletion: true,
                }}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Box sx={{ display: "flex", width: "75%" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Tooltip title="Submit Answer To Gemini AI">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    height: "fit-content",
                    bgcolor: "#073642",
                    padding: "10px",
                    borderRadius: "10px",
                    "&:hover": { bgcolor: "#657b83" },
                  }}
                  onClick={() => genResult()}
                >
                  <AssistantOutlinedIcon
                    fontSize="large"
                    sx={{ color: "white" }}
                  />
                </Button>
              </Tooltip>
              <Tooltip title="Get A Hint From Gemini AI">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    height: "fit-content",
                    bgcolor: "#073642",
                    padding: "10px",
                    borderRadius: "10px",
                    marginTop: "5px",
                    "&:hover": { bgcolor: "#657b83" },
                  }}
                  onClick={() => genHint()}
                >
                  <TipsAndUpdatesOutlinedIcon
                    fontSize="medium"
                    sx={{ color: "white" }}
                  />
                </Button>
              </Tooltip>
            </Box>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Box
                borderRadius="10px"
                p={5}
                sx={{
                  backgroundColor: "#002b36",
                  width: "100%",
                  color: "#839496",
                  marginLeft: "5px",
                }}
              >
                {generatedResult ? (
                  <TypewriterComponent
                    key={resultKey}
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(0.01)
                        .typeString(generatedResult)
                        .pauseFor(2500)
                        .start();
                    }}
                  />
                ) : (
                  <TypewriterComponent
                    onInit={(typewriter) => {
                      typewriter
                        .changeDelay(0.01)
                        .typeString(
                          "Submit your code or get a hint from Gemini AI!",
                        )
                        .pauseFor(2500)
                        .start();
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeChallenge;
