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
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";
import AutoModeOutlinedIcon from "@mui/icons-material/AutoModeOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

import { keyframes } from "@emotion/react";

import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/ext-searchbox";
import { useNavigate } from "react-router-dom";
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

const pulse = keyframes`
  0% {
    background-color: rgb(0, 43, 54, 1);
  }
  50% {
    background-color: rgba(0, 43, 54, 0.5);
  }
  100% {
    background-color: rgba(0, 43, 54, 1);
  }
`;

const CodeChallenge = () => {
  const navigate = useNavigate();
  const { postData } = useApi();
  const [generatedResult, setGeneratedResult] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [codeChallenge, setCodeChallenge] = useState("");
  const [codeChallengeKey, setCodeChallengeKey] = useState(0);
  const [resultKey, setResultKey] = useState(0);
  const [codeMode, setCodeMode] = useState("python");
  const [loadingCode, setLoadingCode] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  // generate result from code input
  const genResult = async () => {
    try {
      setLoadingResult(true);
      const response = await postData(`api/gemini/generateText`, {
        prompt: `Based on the challenge: ${codeChallenge}, evaluate my answer: ${codeInput}, and give me a score out of 100, in under 200 words. And if my answer given above is not code, tell me (and you don't need to give me a score if this is the case).`,
      });
      setResultKey((prevKey) => prevKey + 1);
      setGeneratedResult(response.content);
      setLoadingResult(false);
    } catch (error) {
      console.log(error);
    }
  };

  // generate a coding challenge from gemini ai
  const genCodeChallenge = async () => {
    try {
      setLoadingCode(true);
      const response = await postData(`api/gemini/generateText`, {
        prompt:
          "Can you give me a small basic code challenge to do that is fun and a good learning experience? (under 100 words)",
      });
      setCodeChallengeKey((prevKey) => prevKey + 1);
      setCodeChallenge(response.content);
      setGeneratedResult("");
      setLoadingCode(false);
    } catch (error) {
      console.log(error);
    }
  };

  // get hint from gemini ai
  const genHint = async () => {
    try {
      setLoadingResult(true);
      const response = await postData(`api/gemini/generateText`, {
        prompt: `Based on the challenge ${codeChallenge}, and my current answer: ${codeInput}, can you give me a couple hints on what I need to do to complete the challenge, even if my answer is nothing so far, but make sure that I give you a coding challenge. (under 100 words)`,
      });
      setResultKey((prevKey) => prevKey + 1);
      setGeneratedResult(response.content);
      setLoadingResult(false);
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
        backgroundColor: "#3CA3EE",
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
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "46px",
            fontWeight: "700",
            color: "white",
            marginBottom: "10px",
            letterSpacing: "0.5px",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Code Challenge using Gemini AI
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            width: "80%",
            border: 1,
            borderColor: "white",
            borderRadius: "10px",
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "40px",
            }}
          >
            <Box sx={{ display: "flex", width: "90%" }}>
              <Tooltip title="Generate Code Challenge With Gemini AI">
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    height: "fit-content",
                    bgcolor: "#FFC93C",
                    padding: "10px",
                    borderRadius: "10px",
                    "&:hover": { bgcolor: "#F7B92C" },
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
                    animation: loadingCode ? `${pulse} 1.5s infinite` : "none",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                width: "100%",

                marginTop: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#272822",
                  padding: "10px",
                  width: "90%",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  gap: "10px",
                }}
              >
                <FormControl
                  size="small"
                  variant="standard"
                  sx={{
                    bgcolor: "#272822",
                    borderRadius: "10px",
                    color: "white",
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiSelect-select": { color: "#839496" },
                    marginRight: "auto",
                    marginLeft: "10px",
                  }}
                >
                  <InputLabel>Language</InputLabel>
                  <Select value={codeMode} onChange={handleModeChange}>
                    {languages.map((lang) => (
                      <MenuItem key={lang} value={lang}>
                        {lang}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/*}
              <Tooltip title="Run Code">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#272822",
                    "&:hover": { bgcolor: "#3E3F32" },
                    marginLeft: "10px",
                  }}
                >
                  <PlayArrowOutlinedIcon sx={{ color: "white" }} />
                </Button>
              </Tooltip>


              A run code button to run the code to test before submitting
              */}

                <Tooltip title="Get Hint">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#66D9EF",
                      "&:hover": { bgcolor: "#79E0FF" },
                      marginLeft: "10px",
                    }}
                    onClick={() => genHint()}
                  >
                    <TipsAndUpdatesOutlinedIcon sx={{ color: "#272822" }} />
                  </Button>
                </Tooltip>

                <Tooltip title="Submit Code">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#A6E22E",
                      "&:hover": { bgcolor: "#B6F35D" },
                      marginLeft: "10px",
                    }}
                    onClick={() => genResult()}
                  >
                    <AssistantOutlinedIcon sx={{ color: "#272822" }} />
                  </Button>
                </Tooltip>
              </Box>

              <AceEditor
                maxLines={20}
                minLines={20}
                mode={codeMode}
                theme="monokai"
                value={codeInput}
                onChange={handleInputChange}
                editorProps={{ $blockScrolling: true }}
                highlightActiveLine={true}
                setOptions={{
                  enableLiveAutocompletion: true,
                }}
                style={{
                  width: "90%",
                }}
              />
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
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Box
                borderRadius="10px"
                p={5}
                sx={{
                  backgroundColor: "#002b36",
                  width: "90%",
                  color: "#839496",
                  marginLeft: "5px",
                  animation: loadingResult ? `${pulse} 1.5s infinite` : "none",
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
          <Box sx={{ width: "90%", marginTop: "20px", marginBottom: "20px" }}>
            <Tooltip title="Back to Units Page">
              <Button
                onClick={() => navigate(-1)}
                variant="contained"
                sx={{
                  height: "fit-content",
                  bgcolor: "#FFC93C",
                  padding: "10px",
                  borderRadius: "10px",
                  "&:hover": { bgcolor: "#F7B92C" },
                }}
              >
                BACK
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CodeChallenge;
