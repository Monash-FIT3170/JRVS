import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useApi } from "../../context/ApiProvider";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import pako from "pako";
import { Buffer } from "buffer";
import TypewriterComponent from "typewriter-effect";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import TargetImage from "../../assets/images/eagle-in-flight.png";
import DefaultImage from "../../assets/images/solid-color-image.png";
import { keyframes } from "@emotion/react";

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

// used to get base64 from file
function getBase64FromUrl(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
}

// turns base 64 image to generative part of gemini vision
async function base64ToGenerativePart(base64, mimeType) {
  const compressedBase64 = await compressBase64(base64);
  return {
    inlineData: {
      data: compressedBase64,
      mimeType: mimeType,
    },
  };
}

// resizes base64 image to desired dimensions, to reduce size
function resizeBase64Image(base64Str, newWidth, newHeight) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Str}`;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const resizedBase64 = canvas.toDataURL("image/jpeg").split(",")[1];
      resolve(resizedBase64);
    };
    img.onerror = reject;
  });
}

// compress base 64 string to post in request body
async function compressBase64(base64String) {
  try {
    const resizedBase64 = await resizeBase64Image(base64String, 256, 256);
    const binaryData = Buffer.from(resizedBase64, "base64");
    const compressedData = pako.gzip(binaryData);
    return Buffer.from(compressedData).toString("base64");
  } catch (error) {
    console.error("Error resizing or compressing image:", error);
  }
}

const GenImageChallenge = () => {
  const { postData } = useApi();
  const [generatedResult, setGeneratedResult] = useState(null);
  const [promptInput, setPromptInput] = useState("");
  const [generatedComparison, setGeneratedComparison] = useState("");
  const [comparisonKey, setComparisonKey] = useState(0);
  const [base64String, setBase64String] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  // session id for posting multiple images
  const sessionId = uuidv4();

  // turn target image to base 64
  useEffect(() => {
    getBase64FromUrl(TargetImage)
      .then((base64) => setBase64String(base64))
      .catch((error) => console.error("Error converting file:", error));
  }, []);

  const genResult = async () => {
    try {
      setLoadingImage(true);
      const response = await postData(`api/gemini/generateImage`, {
        prompt: promptInput,
        negativePrompt: "",
      });
      setGeneratedResult(response.content);
      setLoadingImage(false);
      // after generates image from getimg.ai, send to gemini to compare

      // turn each image to generative part for gemini ai
      const genImagePart = await base64ToGenerativePart(
        response.content.image,
        "image/jpeg",
      );
      const targetImagePart = await base64ToGenerativePart(
        base64String,
        "image/png",
      );
      const imageParts = [genImagePart, targetImagePart];

      // for each image part, post to server
      for (const imagePart of imageParts) {
        try {
          const response = await postData(`api/gemini/generateImageVision`, {
            prompt:
              "Based on these two images, can you give me a similarity report on these two images, with a score (under 100 words).",
            filePart: imagePart,
            sessionId: sessionId,
          });

          // if gemini response is given, show to user in front end
          if (response.content) {
            setGeneratedComparison(response.content);
            setComparisonKey((prevKey) => prevKey + 1);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setPromptInput(event.target.value);
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
          Image Challenge using Generative AI
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
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                borderRadius="10px"
                p={5}
                sx={{
                  backgroundColor: "#002b36",
                  width: "100%",
                  color: "#839496",
                  animation: loadingImage ? `${pulse} 1.5s infinite` : "none",
                }}
              >
                <TypewriterComponent
                  onInit={(typewriter) => {
                    typewriter
                      .changeDelay(0.01)
                      .typeString(
                        "Give a prompt to generate an image that matches the target image below!",
                      )
                      .pauseFor(2500)
                      .start();
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}
                    onChange={handleInputChange}
                    value={promptInput}
                    placeholder="A load of cash."
                    sx={{
                      bgcolor: "#073642",
                      borderRadius: "10px",
                      color: "#839496",
                      "& .MuiInputBase-input": {
                        color: "#839496",
                        boxShadow: "none",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderWidth: 0,
                          borderRadius: "10px",
                        },
                        "&:hover fieldset": {
                          borderWidth: "1.5px",
                          borderColor: "black", // Border color on hover
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          borderWidth: "1.5px",
                        },
                      },
                      marginRight: "5px",
                    }}
                  />
                  <Tooltip title="Generate Image using getimg.ai">
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
                      <AutoAwesomeIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      />
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "40px",
                }}
              >
                <Box
                  borderRadius="10px"
                  p={5}
                  sx={{
                    backgroundColor: "#002b36",
                    display: "flex",
                    maxWidth: "100%",
                    width: "fit-content",
                    color: "#839496",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <ReactCompareSlider
                    style={{ width: "512px", borderRadius: "10px" }}
                    itemOne={
                      <ReactCompareSliderImage
                        src={
                          generatedResult
                            ? `data:image/png;base64, ${generatedResult.image}`
                            : DefaultImage
                        }
                        alt="Your Image"
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={TargetImage}
                        alt="Target Image"
                      />
                    }
                  />
                </Box>
                <Box
                  borderRadius="10px"
                  p={5}
                  sx={{
                    backgroundColor: "#002b36",
                    width: "100%",
                    color: "#839496",
                    marginLeft: "20px",
                  }}
                >
                  {generatedComparison ? (
                    <TypewriterComponent
                      key={comparisonKey}
                      onInit={(typewriter) => {
                        typewriter
                          .changeDelay(0.01)
                          .typeString(generatedComparison)
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
                            "Generate an image to get a comparison from Gemini AI!",
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
    </Box>
  );
};

export default GenImageChallenge;
