import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Score from "./Score.jsx";
import axios from "axios";
import { Link } from "react-router";
import themeContext from "./ThemeContext.jsx";
import AnalyzeResumeResult from "./AnalyzeResumeResult.jsx"
export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  // const [mode,setMode] = useState(1)
  // const handleAnalyze = () => {
  // setLoading(true);
  // console.log("result", result);
   const theme = useContext(themeContext)
   const mode =theme.mode;
  const handleAnalyze = async () => {
    
    
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc", jobDesc);
try{
 console.log(file);

console.log(file.name);
console.log(file.type);
console.log(file.size);

for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
}catch(err){
   console.log(err);
}
    try {
      console.log("sahi he");
      const token =  localStorage.getItem("token");
      const res = await axios.post("https://resume-analyzer-9avl.onrender.com/upload", formData, {
    headers: {
      authorization: token,
    },
  }
);
     

      // backend response set karo
      setResult({
        score: res.data.score,
        // requiredSkills:res.data.requiredSkills,
        found: res.data.foundSkills,
        missing: res.data.missingSkills,

        aiSuggestions: res.data.aiSuggestions,
        skills: res.data.requiredSkillsAI,
      });
    } catch (error) {
      console.log(error?.response?.data);
      console.log(error);
      
      alert("Error analyzing resume");
    }

    setLoading(false);
  };
  // };
console.log("mode",mode);

  return (
    <div className={`min-h-screen ${mode?"bg-linear-to-br from-gray-900 to-gray-800":"bg-linear-to-r from-blue-600/10 to-purple-600/10 "}  flex flex-col items-center shadow pt-0 text-white`}>
      {/* Title */}
      {
        console.log(mode,"mode is")
        
      }
      {/* <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8"
      >
        🚀 Smart Resume Analyzer
      </motion.h1> */}
  
      {/* Upload Box */}
      {/* bg-linear-to-r from-blue-600/10 to-purple-600/10 */}
      {!result && (
        <div className={`w-full mt-20 max-w-xl backdrop-blur-lg  bg-linear-to-r from-blue-600/10 to-purple-600/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center`}>
          <label className={`flex flex-col items-center justify-center border-2 border-dashed ${mode?"border-gray-400":"border-gray-950"} rounded-xl p-6 cursor-pointer hover:border-blue-400 transition`}>
            <p className={`${mode?'text-gray-200':'text-black font-serif'} mb-2`}>📂Upload Resume (PDF)</p>
            <p className={`text-sm ${mode?'text-gray-200':'text-black font-serif'}`}>or click to select file</p>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <p className={`mt-3 text-sm ${mode?"text-gray-300":"text-gray-950"} `}>Selected: {file.name}</p>
          )}
          <textarea
            placeholder="Paste Job Description here..."
            className={`w-full mt-4  border-2 border-dotted ${mode?"font-semibold placeholder:text-gray-300 font-serif":" font-semibold placeholder:border-gray-950 font-serif text-black"} rounded-xl p-6 cursor-pointer hover:border-blue-400 transition`}
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-5 w-full  bg-linear-to-r from-blue-600 to-purple-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      )}

      {/* {loading && (
        <div className="mt-6 animate-pulse text-gray-300">
          🔍 Analyzing resume...
        </div>
      )} */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">
              🔍 Analyzing Resume...
            </p>
          </div>
        </div>
      )}

      {/* Result Section */}
      {result && !loading && (
        // ${!mode?"bg-linear-to-r from-blue-600/10 to-purple-600/10":"bg-linear-to-br from-gray-900 to-gray-800"}
            <AnalyzeResumeResult file={file} jobDesc={jobDesc} result={result}></AnalyzeResumeResult>
      )}
    </div>
  );
}
