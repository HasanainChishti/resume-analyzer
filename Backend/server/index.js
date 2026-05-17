// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const pdf = require("pdf-parse/lib/pdf-parse.js");
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const mongoose = require("mongoose");
// const { log } = require("console");
// const app = express();
// const Analysis = require("../Model/Analysis.js");
// const user = require("../Model/User.js");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")
// const path = require("path");
// const fs = require("fs");
// app.use(cors());
// app.use(express.json());

// // 🔐 Gemini setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("mongodb connected"))
//   .catch((error) => console.log(error));


// // 📁 multer config





//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });
// // 🤖 AI FUNCTION (clean structured output)
// async function getAISuggestions(resumeText, jobDesc) {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//     });
//     const prompt = `
// You are a Resume Analyzer AI.

// Analyze the resume and the job description carefully.

// IMPORTANT RULES:
// - Extract only practical technical skills from the Job Description.
// - Do NOT return generic terms like:
//   Frontend Development,
//   Backend Development,
//   Web Development,
//   State Management using Redux,
//   Routing using React Router

// - Return clean skill names only.
//   Example:
//   Correct:
//   React.js
//   JavaScript
//   HTML
//   CSS
//   Redux
//   React Router
//   Node.js
//   Express.js
//   MongoDB

//   Wrong:
//   Using React
//   Routing using React Router
//   State Management (Redux)

// - If the JD is for React Developer, include common React skills like:
//   React.js, JavaScript, HTML, CSS, Redux, React Router, API Integration, Tailwind CSS

// - If the JD is for MERN Stack Developer, include:
//   React.js, Node.js, Express.js, MongoDB, REST API, Git, GitHub

// - If technologies are implied but not directly mentioned, infer common relevant skills based on the role.

// Return output in this exact format:

// REQUIRED SKILLS:
// - skill 1
// - skill 2
// - skill 3

// SUGGESTIONS:
// - suggestion 1
// - suggestion 2
// - suggestion 3

// Resume:
// ${resumeText}

// Job Description:
// ${jobDesc}
// `;
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();
//     //  console.log("text",text);

//     let requiredSkills = [];
//     let suggestions = [];

//     const sections = text.split("SUGGESTIONS:");
//     console.log("section", sections);

//     // 🔹 Skills extract
//     if (sections[0]) {
//       requiredSkills = sections[0]
//         .replace("SKILLS:", "")
//         .split("\n")
//         .filter((line) => line.includes("-"))
//         .map((line) => line.replace("-", "").trim());
//     }
//     console.log("required skills", requiredSkills);

//     // 🔹 Suggestions extract
//     if (sections[1]) {
//       suggestions = sections[1]
//         .split("\n")
//         .filter((line) => line.includes("-"))
//         .map((line) => line.replace("-", "").trim());
//     }

//     return {
//       requiredSkills,
//       suggestions,
//     };
//   } catch (err) {
//     console.error("Gemini Error:", err);
//     return {
//       requiredSkills: [],
//       suggestions: ["AI suggestions not available"],
//     };
//   }
// }

// // 🚀 MAIN ROUTE
// app.post("/upload", upload.single("resume"), async (req, res) => {
//   try {
//     console.log(req.file);

//     const data = await pdf(dataBuffer);

//     const resumeText = data.text.toLowerCase();
//     const jobDesc = req.body.jobDesc ? req.body.jobDesc.toLowerCase() : "";

//     // 🤖 AI CALL
//     const aiData = await getAISuggestions(resumeText, jobDesc);

//     // 🧠 skill matching (your logic)
//     let foundSkills = [];
//     let missingSkills = [];
//     // for(let i=0;i<aiData.requiredSkills.length;i++)
//     //  {
//     //    if(!resumeText.includes(aiData.requiredSkills[i]))
//     //      missingSkills.push(aiData.requiredSkills[i]);
//     //  }
//     foundSkills = aiData.requiredSkills.filter((skill) =>
//       resumeText.includes(skill.toLowerCase()),
//     );
//     missingSkills = aiData.requiredSkills.filter(
//       (skill) => !resumeText.includes(skill.toLowerCase()),
//     );

//     const skills = {
//       react: ["react", "reactjs"],
//       javascript: ["javascript", "js"],
//       node: ["node", "nodejs"],
//       mongodb: ["mongodb"],
//       html: ["html"],
//       css: ["css"],
//       tailwind: ["tailwind"],
//       bootstrap: ["bootstrap"],
//       java: ["java"],
//       spring: ["spring"],
//       python: ["python"],
//     };

//     // JD → required skills
//     // for (let key in skills) {
//     //   const variations = skills[key];
//     //   if (variations.some(word => jobDesc.includes(word))) {
//     //     requiredSkills.push(key);
//     //   }
//     // }

//     // // Resume check
//     // for (let skill of requiredSkills) {
//     //   const variations = skills[skill];
//     //   if (variations.some(word => resumeText.includes(word))) {
//     //     foundSkills.push(skill);
//     //   } else {
//     //     missingSkills.push(skill);
//     //   }
//     // }

//     // 🎯 score
//     const score =
//       aiData.requiredSkills.length === 0
//         ? 0
//         : Math.round((foundSkills.length / aiData.requiredSkills.length) * 100);
//     await Analysis.create({
//       resumeName: req.file.originalname,
//       score,
//       foundSkills,
//       missingSkills,
//       requiredSkills: aiData.requiredSkills,
//       suggestions: aiData.suggestions,
//     });
//     // 📦 FINAL RESPONSE
//     res.json({
//       score,
//       foundSkills,
//       missingSkills,

//       // 🤖 AI DATA
//       aiSuggestions: aiData.suggestions,
//       requiredSkillsAI: aiData.requiredSkills,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error processing resume" });
//   }
// });

// app.get("/history", async (req, res) => {
//   try {
//     const data = await Analysis.find().sort({ createdAt: -1 });
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Error fetching history" });
//   }
// });
// app.delete("history/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     await Analysis.findByIdAndDelete(id);
//     res.json({ message: "Delet succeessfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "delete Failed" });
//   }
// });

// app.post("/signup", async (req, res) => {
//   console.log("ok signup hit");
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const pass = req.body.password;
//     const password = await bcrypt.hash(pass, 10);
//     await user.create({
//       name,
//       email,
//       password,
//     });
//     res.json({ message: "user created Successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Signup failed" });
//   }
// });
// app.post("/login", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
     
//     const findUser = await user.findOne({ email });
//      if(!findUser)
//       return res.json({message:"user not Signup"})
//       const isMatch = await bcrypt.compare(password, findUser.password);
      
    
//     const token = jwt.sign({id:findUser._id},process.env.JWT_SECRET)
//     // localStorage.setItem("token",token)
//       if(isMatch)
//     return  res.json({ message: "Login Successfull",token });
//    else
//       res.status(401).json({ message: "Invalid password" });
   
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error" });
//   }
// });

// // test route
// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
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
console.log(upload,"is upload");

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

    const jobDesc = req.body.jobDesc
      ? req.body.jobDesc.toLowerCase()
      : "";

    // 🤖 AI
    const aiData = await getAISuggestions(resumeText, jobDesc);

    let foundSkills = aiData.requiredSkills.filter((skill) =>
      resumeText.includes(skill.toLowerCase())
    );

    let missingSkills = aiData.requiredSkills.filter(
      (skill) => !resumeText.includes(skill.toLowerCase())
    );

    // 🎯 score
    const score =
      aiData.requiredSkills.length === 0
        ? 0
        : Math.round(
            (foundSkills.length / aiData.requiredSkills.length) * 100
          );

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
      score:score||"",
      foundSkills:foundSkills||"",
      missingSkills:missingSkills||"",
      aiSuggestions: aiData.suggestions||"",
      requiredSkillsAI: aiData.requiredSkills||"",
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

    const isMatch = await bcrypt.compare(
      password,
      findUser.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: findUser._id },
      process.env.JWT_SECRET
    );

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