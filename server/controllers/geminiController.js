const asyncHandler = require("express-async-handler");
const axios = require("axios");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    },
  };

  try {
    console.log(process.env.GEMINI_API_KEY);
    console.log(process.env.GETIMG_API_KEY);
    const response = await axios(url, options);
    const generatedData = response.data;
    res.json({ content: generatedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating image." });
  }
});

module.exports = { generateText, generateImage };
