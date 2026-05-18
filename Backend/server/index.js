require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const path = require("path");
const pdf = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const Analysis = require("../Model/Analysis.js");
const user = require("../Model/User.js");

app.use(cors());
app.use(express.json());

// 🔐 Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log(error));

//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
const upload = multer({
  storage: multer.memoryStorage(),
});
console.log(upload, "is upload");

// 🤖 AI FUNCTION
async function getAISuggestions(resumeText, jobDesc) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a Resume Analyzer AI.

Return output in this exact format:

REQUIRED SKILLS:
- skill 1
- skill 2

SUGGESTIONS:
- suggestion 1
- suggestion 2

Resume:
${resumeText}

Job Description:
${jobDesc}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    let requiredSkills = [];
    let suggestions = [];

    const sections = text.split("SUGGESTIONS:");

    // skills
    if (sections[0]) {
      requiredSkills = sections[0]
        .replace("REQUIRED SKILLS:", "")
        .split("\n")
        .filter((line) => line.includes("-"))
        .map((line) => line.replace("-", "").trim());
    }

    // suggestions
    if (sections[1]) {
      suggestions = sections[1]
        .split("\n")
        .filter((line) => line.includes("-"))
        .map((line) => line.replace("-", "").trim());
    }

    return {
      requiredSkills,
      suggestions,
    };
  } catch (err) {
    console.log(err);

    return {
      requiredSkills: [],
      suggestions: ["AI suggestions not available"],
    };
  }
}

// 🚀 upload route
app.post("/upload", upload.single("resume"), async (req, res) => {
  console.log("hit upload route");
  console.log(req.file);

  console.log(req.body);
  try {
    const dataBuffer = req.file.buffer;
    const data = await pdf(dataBuffer);

    const resumeText = data.text.toLowerCase();

    const jobDesc = req.body.jobDesc ? req.body.jobDesc.toLowerCase() : "";

    // 🤖 AI
    const aiData = await getAISuggestions(resumeText, jobDesc);

    let foundSkills = aiData.requiredSkills.filter((skill) =>
      resumeText.includes(skill.toLowerCase()),
    );

    let missingSkills = aiData.requiredSkills.filter(
      (skill) => !resumeText.includes(skill.toLowerCase()),
    );

    // 🎯 score
    const score =
      aiData.requiredSkills.length === 0
        ? 0
        : Math.round((foundSkills.length / aiData.requiredSkills.length) * 100);

    // 💾 save history
    await Analysis.create({
      resumeName: req.file.originalname,
      score,
      foundSkills,
      missingSkills,
      requiredSkills: aiData.requiredSkills,
      suggestions: aiData.suggestions,
    });

    // ✅ response
    res.json({
      score: score || "",
      foundSkills: foundSkills || "",
      missingSkills: missingSkills || "",
      aiSuggestions: aiData.suggestions || "",
      requiredSkillsAI: aiData.requiredSkills || "",
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});

// 📜 history
app.get("/history", async (req, res) => {
  try {
    const data = await Analysis.find().sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Error fetching history",
    });
  }
});

// ❌ delete
app.delete("/history/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Analysis.findByIdAndDelete(id);

    res.json({
      message: "Delete successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
});

// 📝 signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Signup failed",
    });
  }
});

// 🔐 login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await user.findOne({ email });

    if (!findUser) {
      return res.json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Login failed",
    });
  }
});

// ✅ test route
app.get("/", (req, res) => {
  res.send(" new Backend running 🚀");
});

// ✅ server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
