




// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const pdf = require("pdf-parse");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 🔐 API KEY
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// // multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // 🤖 AI function
// async function getAISuggestions(resumeText, jobDesc) {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `
// Compare this resume and job description.

// Give 3 short improvement suggestions.

// Resume:
// ${resumeText}

// Job Description:
// ${jobDesc}
//                   `,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     return (
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "No suggestions"
//     );
//   } catch (error) {
//     console.log("Gemini Error:", error);
//     return "AI suggestions not available";
//   }
// }

// // 🚀 MAIN ROUTE
// app.post("/upload", upload.single("resume"), async (req, res) => {
//   try {
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const data = await pdf(dataBuffer);

//     const resumeText = data.text.toLowerCase();
//     const jobDesc = req.body.jobDesc
//       ? req.body.jobDesc.toLowerCase()
//       : "";

//     // 🧠 WORD SPLIT (FIX BUG)
//     const jobWords = jobDesc.split(/\W+/);
//     const resumeWords = resumeText.split(/\W+/);

//     const skills = {
//       react: ["react", "reactjs"],
//       javascript: ["javascript", "js"],
//       node: ["node", "nodejs", "node.js"],
//       mongodb: ["mongodb", "mongo"],
//       html: ["html"],
//       css: ["css"],
//       tailwind: ["tailwind", "tailwindcss"],
//       bootstrap: ["bootstrap"],
//       java: ["java"],
//       spring: ["spring", "springboot"],
//       python: ["python"],
//       ai: ["artificial intelligence"],
//       ml: ["machine learning"],
//     };

//     const requiredSkills = [];
//     const foundSkills = [];
//     const missingSkills = [];

//     // 🧠 STEP 1: JD → required skills
//     for (let key in skills) {
//       const variations = skills[key];

//       const inJob = variations.some((word) =>
//         jobWords.includes(word)
//       );

//       if (inJob) {
//         requiredSkills.push(key);
//       }
//     }

//     // 🧠 STEP 2: Resume check
//     for (let skill of requiredSkills) {
//       const variations = skills[skill];

//       const inResume = variations.some((word) =>
//         resumeWords.includes(word)
//       );

//       if (inResume) {
//         foundSkills.push(skill);
//       } else {
//         missingSkills.push(skill);
//       }
//     }

//     // 🎯 SCORE
//     const score =
//       requiredSkills.length === 0
//         ? 0
//         : Math.round(
//             (foundSkills.length / requiredSkills.length) * 100
//           );

//     // 🤖 AI CALL
//     const aiSuggestions = await getAISuggestions(
//       resumeText,
//       jobDesc
//     );

//     res.json({
//       score,
//       requiredSkills,
//       foundSkills,
//       missingSkills,
//       aiSuggestions,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error processing resume" });
//   }
// });

// // test
// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });







// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import pdfParse from "pdf-parse/lib/pdf-parse.js";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const app = express();

// app.use(cors());
// app.use(express.json());
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // folder name
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });
// // test route
// app.get("/", (req, res) => {
//   res.send("Backend working 🚀");
// });
//  api.post('/analyzer',(req,res)=>{
//     console.log(req.body);
//      res.json({
//         message:"data received Successfully",
//         data:req.body,
//      })
//  })
//  app.post("/upload", upload.single("resume"), (req, res) => {
//   console.log(req.file);

//   res.json({
//     message: "File uploaded successfully"
//   });
// });
// app.post("/upload", upload.single("resume"), async (req, res) => {
//   try {
//     // file path
//     const filePath = req.file.path;

//     // file read karo
//     const dataBuffer = fs.readFileSync(filePath);

//     // pdf parse karo
//     const data = await pdf(dataBuffer);

//     // text mil gaya
//     const text = data.text;

//     console.log(text); // terminal me full resume text

//     res.json({
//       message: "PDF processed",
//       text: text
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error reading PDF" });
//   }
// });
// 🔹 imports
// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import fs from "fs";
// import { createRequire } from "module";
// import { log } from "console";

// // const require = createRequire(import.meta.url);
// const pdf = require("pdf-parse");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // 🔹 multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // 🔥 MAIN ROUTE (Upload + Analyze)
// app.post("/upload", upload.single("resume"), async (req, res) => {
//     console.log(req.file,"ye he");

//   try {
//     // 1. file path

//     const filePath = req.file.path;

//     // 2. read file
//     const dataBuffer = fs.readFileSync(filePath);

//     // 3. parse PDF
//     const data = await pdf(dataBuffer);
//     const text = data.text;

//     // 4. skill detection
//     const resumeText = text.toLowerCase();

//     const skills = [
//       "react",
//       "javascript",
//       "html",
//       "css",
//       "node",
//       "mongodb"
//     ];

//     const foundSkills = skills.filter(skill =>
//       resumeText.includes(skill)
//     );

//     const missingSkills = skills.filter(skill =>
//       !resumeText.includes(skill)
//     );

//     const score = Math.round(
//       (foundSkills.length / skills.length) * 100
//     );

//     // 5. response
//     res.json({
//       score,
//       foundSkills,
//       missingSkills
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error processing resume" });
//   }
// });

// // 🔹 test route
// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// // 🔹 server start
// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const pdf = require("pdf-parse");

// import pdfParse from "pdf-parse";

// const data = await pdfParse(dataBuffer);
// const text = data.text.toLowerCase();
// // const require = createRequire(import.meta.url);
// // const pdf = require("pdf-parse");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // 📁 multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // 🧪 test route
// app.get("/", (req, res) => {
//   res.send("Backend running 🚀");
// });

// // app.post("/upload", upload.single("resume"), (req, res) => {
// //   console.log(req.file);

// //   return res.json({
// //     message: "UPLOAD WORKING",
// //     file: req.file
// //   });
// // });
// // 🚀 upload route
// app.post("/upload", upload.single("resume"), async (req, res) => {
//       console.log("👉 ROUTE HIT");
//   console.log("FILE:", req.file);
//   try {
//     console.log("FILE:", req.file);

//     const filePath = req.file.path;
//     const dataBuffer = fs.readFileSync(filePath);

//     const data = await pdf(dataBuffer);
//     const text = data.text.toLowerCase();

//     const skills = ["react", "javascript", "html", "css", "node", "mongodb"];

//     const foundSkills = skills.filter(skill =>
//       text.includes(skill)
//     );

//     const missingSkills = skills.filter(skill =>
//       !text.includes(skill)
//     );

//     const score = Math.round(
//       (foundSkills.length / skills.length) * 100
//     );

//     res.json({
//       score,
//       foundSkills,
//       missingSkills
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error processing resume" });
//   }
// });

// // 🚀 server start (ONLY ONCE)
// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse/lib/pdf-parse.js");
const { log } = require("console");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();
const genAI = new GoogleGenerativeAI('AIzaSyDB9kdZ9AUI6Dg8CiZcPm9d44pAoDL2j6g');
app.use(cors());
app.use(express.json());

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// route
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    // console.log("FILE:", req.file);
   console.log("yes");
   
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);

    const resumeText = data.text.toLowerCase();
         console.log(req.body.jobDesc,"jobdesc");
    const jobDesc = req.body.jobDesc ? req.body.jobDesc.toLowerCase() : "";
     const GEMINI_API_KEY=""
//         async function getAISuggestions(resumeText, jobDesc) {
//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDB9kdZ9AUI6Dg8CiZcPm9d44pAoDL2j6g",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `
// You are an AI Resume Analyzer.

// Compare the resume and job description.

// Give 3 short suggestions to improve the resume.

// Resume:
// ${resumeText}

// Job Description:
// ${jobDesc}
//                   `
//                 }
//               ]
//             }
//           ]
//         })
//       }
//     );

//     const data = await response.json();
//    console.log("data of ai is",data);
   
//     return data?.candidates[0]?.content?.parts[0]?.text;

//   } catch (error) {
//     console.log("Gemini Error:", error);
//     return "AI suggestions not available";
//   }
// }
// async function getAISuggestions(resumeText, jobDesc) {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `
// Compare this resume and job description.

// Give 3 short improvement suggestions.

// Resume:
// ${resumeText}

// Job Description:
// ${jobDesc}
//                   `
//                 }
//               ]
//             }
//           ]
//         })
//       }
//     );

//     const data = await response.json();

//     return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No suggestions";

//   } catch (error) {
//     console.log("Gemini Error:", error);
//     return "AI suggestions not available";
//   }
// }
async function getAISuggestions(resumeText, jobDesc) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview", // safer
    });

    const prompt = `

Compare this resume and job description.

Give me required improvement suggestions in bullet points only Short and clean.


Resume:
${resumeText}

Job Description:
${jobDesc}
    `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();
 console.log("data ",text);
 
    return text
    .split("\n")
    .filter(line => line.trim() !== "")
    .map(line =>
      line
        .replace(/^\*\s*/, "")        // remove *
        .replace(/\*\*/g, "")        // remove **
        .trim()
    );

  } catch (err) {
    console.error("Gemini Error:", err);
    return "AI suggestions not available";
  }
}
const aiSuggestions = await getAISuggestions(resumeText, jobDesc);
console.log("ai suu",aiSuggestions);

    const foundSkills = [];
    const missingSkills = [];
    const requiredSkills = [];

    const skills = {
      react: ["react", "reactjs"],
      javascript: ["javascript", "js"],
      node: ["node", "nodejs", "node.js"],
      mongodb: ["mongodb", "mongo"],
      html: ["html"],
      css: ["css"],
      tailwind: ["tailwind", "tailwindcss"],
      bootstrap: ["bootstrap"],
      java: ["java"],
      spring: ["spring", "springboot"],
      python: ["python"],
      ai: [ "artificial intelligence"],
      ml: [ "machine learning"],
    };

    for (let key in skills) {
      const variations = skills[key];

      const inJob = variations.some((word) => jobDesc.includes(word));

      if (inJob) {
        requiredSkills.push(key);
      }
    }
console.log(requiredSkills,"req skills");

    // 🧠 STEP 2: Resume me check karo
    for (let skill of requiredSkills) {
      const variations = skills[skill];

      const inResume = variations.some((word) => resumeText.includes(word));

      if (inResume) {
        foundSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }
//  console.log(requiredSkills.foundSkills, missingSkills);

    // 🎯 STEP 3: Score
    const score =
      requiredSkills.length === 0
        ? 0
        : Math.round((foundSkills.length / requiredSkills.length) * 100);
   
    res.json({
      score,
      requiredSkills,
      foundSkills,
      missingSkills,
      aiSuggestions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error processing resume" });
  }
});

// test
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
