const asyncHandler = require("express-async-handler");
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

module.exports = { generateText };
