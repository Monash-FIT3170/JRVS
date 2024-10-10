import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import MenuBar from "../../components/MenuBar";
import { useApi } from "../../context/ApiProvider";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import pako from "pako";
import { Buffer } from "buffer";
import TypewriterComponent from "typewriter-effect";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BotBox from "../../components/content/botBox";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import TargetImage from "../../assets/images/eagle-in-flight.png";
import DefaultImage from "../../assets/images/solid-color-image.png";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const pulse = keyframes`
  0% {
    background-color: rgba(60, 163, 238, 1); /* Full opacity */
  }
  50% {
    background-color: rgba(60, 163, 238, 0.5); /* Half opacity */
  }
  100% {
    background-color: rgba(60, 163, 238, 1); /* Full opacity */
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
  const navigate = useNavigate();
  const { postData } = useApi();
  const [generatedResult, setGeneratedResult] = useState(null);
  const [promptInput, setPromptInput] = useState("");
  const [generatedComparison, setGeneratedComparison] = useState("");
  const [comparisonKey, setComparisonKey] = useState(0);
  const [base64String, setBase64String] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  // session id for posting multiple images
  const sessionId = uuidv4();
  // no of images for gemini image vision context
  const noImages = 2;

  // turn target image to base 64
  useEffect(() => {
    getBase64FromUrl(TargetImage)
      .then((base64) => setBase64String(base64))
      .catch((error) => console.error("Error converting file:", error));
  }, []);

  const genResult = async () => {
    if (!promptInput.trim()) {
      alert("Please enter a prompt to generate the image");
      return;
    }
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
              "Based on these two images, can you give me a similarity report on these two images, with a percentage score out of 100 (under 100 words).",
            filePart: imagePart,
            sessionId: sessionId,
            noImages: noImages,
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
          Image Challenge using Generative AI
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            marginTop: "40px",
            border: 1,
            borderColor: "white",
            borderRadius: "10px",
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",

              padding: "20px",
              gap: "20px",
            }}
          >
            {/* Prompt Input Box */}
            <Box
              borderRadius="10px"
              p={5}
              sx={{
                backgroundColor: "#3CA3EE",
                width: "35%",
                color: "white",
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
                  required
                  minRows={1}
                  maxRows={3}
                  onChange={handleInputChange}
                  value={promptInput}
                  placeholder="Eg: A load of cash"
                  sx={{
                    bgcolor: "lightgrey",
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
                      bgcolor: "#FFC93C",
                      padding: "10px",
                      borderRadius: "10px",
                      "&:hover": { bgcolor: "#F7B92C" },
                    }}
                    onClick={() => genResult()}
                  >
                    <AutoAwesomeIcon fontSize="large" sx={{ color: "white" }} />
                  </Button>
                </Tooltip>
              </Box>
              {/* New Box below the Prompt */}
              <Box
                sx={{
                  mt: 5,
                }}
              >
                <BotBox></BotBox>
              </Box>
            </Box>

            {/* Image Comparison and Result Section */}
            <Box
              sx={{
                display: "flex",

                flexDirection: "column",
              }}
            >
              <Box
                borderRadius="10px"
                p={5}
                sx={{
                  backgroundColor: "#3CA3EE ",
                  display: "flex",
                  maxWidth: "100%",

                  width: "700px",
                  color: "#839496",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <ReactCompareSlider
                  style={{ width: "700px", borderRadius: "10px" }}
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
                  backgroundColor: "#f0f8ff",

                  border: "10px",
                  borderColor: "primary.main",
                  boxShadow: 3,
                  width: "700px",
                  marginTop: "15px",
                  textAlign: "center",
                  fontWeight: 500,
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

                        .start()
                        .callFunction(() => {
                          // Set the state to true when typing is complete
                          setIsTypingComplete(true);
                        });
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

                {isTypingComplete && (
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#FFC700",
                      borderRadius: "20px",
                      color: "white",
                      marginTop: "10px",
                    }}
                  >
                    <p className="russo-one-regular text-4xl">
                      {/*Add custom points heres */}
                      You earned +{10} ⭐️&nbsp;
                    </p>
                  </div>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "75%", marginTop: "20px", marginBottom: "20px" }}>
          <Tooltip title="Back to Units Page">
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              sx={{
                ":hover": { backgroundColor: "#F7B92C" },
                marginRight: "20px",
                marginBottom: "60px",
                padding: "20px",
                borderRadius: "15px",
                backgroundColor: "#FFC93C",
                pointerEvents: "auto",
                paddingX: "30px",
              }}
            >
              BACK
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default GenImageChallenge;
