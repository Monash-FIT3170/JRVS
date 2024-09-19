const asyncHandler = require("express-async-handler");
const axios = require("axios");
const pako = require("pako");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const imageStore = {}; // used to store images

// used to decompressed incoming base64 images
function decompressBase64(compressedBase64String) {
  const binaryData = Buffer.from(compressedBase64String, "base64");
  const decompressedData = pako.ungzip(binaryData);
  return Buffer.from(decompressedData).toString("base64");
}

// can be used to generate text responses from gemini AI
const generateText = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Please provide a prompt." });
  }

  try {
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();
    res.json({ content: generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating text." });
  }
});

// can be used to generate text responses from gemini AI based on the prompt, and two images as context
const generateImageVision = asyncHandler(async (req, res) => {
  const { prompt, filePart, sessionId } = req.body;

  // decompress each element in fileParts
  // each element {inlineData: {data: 'base64', mimeType}}

  if (!prompt) {
    return res.status(400).json({ message: "Please provide a prompt." });
  }
  if (!filePart) {
    return res.status(400).json({ message: "Please provide image." });
  }
  if (!sessionId) {
    return res.status(400).json({ message: "Please provide sessionId" });
  }

  if (!imageStore[sessionId]) {
    imageStore[sessionId] = [];
  }
  imageStore[sessionId].push(filePart);

  // max two images to compare
  if (imageStore[sessionId].length === 2) {
    try {
      const decompressedFileParts = imageStore[sessionId].map((part) => ({
        inlineData: {
          data: decompressBase64(part.inlineData.data),
          mimeType: part.inlineData.mimeType,
        },
      }));

      const result = await model.generateContent([
        prompt,
        ...decompressedFileParts,
      ]);
      const generatedText = result.response.text();
      delete imageStore[sessionId];
      res.json({ content: generatedText });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generating text." });
    }
  } else {
    res.json({ message: "Image received, waiting for the second image." });
  }
});

// can be used to generate images from getimg.ai using stable diffusion
const generateImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Please provide a prompt." });
  }

  const url = "https://api.getimg.ai/v1/stable-diffusion-xl/text-to-image";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
    },
    data: {
      prompt: prompt,
      width: 512,
      height: 512,
      steps: 20,
    },
  };

  try {
    const response = await axios(url, options);
    const generatedData = response.data;
    res.json({ content: generatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating image." });
  }
});

module.exports = { generateText, generateImage, generateImageVision };
