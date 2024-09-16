import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
dotenv.config;

const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY);

const model = "gemini-pro-vision";
