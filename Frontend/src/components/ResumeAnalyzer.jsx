import { motion } from "framer-motion";
import { useContext, useState } from "react";
import Score from "./Score.jsx";
import axios from "axios";
import { Link } from "react-router";
import themeContext from "./ThemeContext.jsx";

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

    try {
      console.log("sahi he");

      const res = await axios.post("https://resume-analyzer-9avl.onrender.com/upload", formData);
     

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
      console.log(error);
      alert("Error analyzing resume");
    }

    setLoading(false);
  };
  // };
console.log("mode",mode);

  return (
    <div className={`min-h-screen ${mode?"bg-linear-to-br from-gray-900 to-gray-800":"bg-linear-to-br from-purple-600/10 to-blue-600/10 "}  flex flex-col items-center shadow pt-0 text-white`}>
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
            <p className={`text-sm ${mode?'text-gray-200':'text-black font-serif'}`}>click to select file</p>

            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <p className="mt-3 text-sm text-gray-300">Selected: {file.name}</p>
          )}
          <textarea
            placeholder="Paste Job Description here..."
            className={`w-full mt-4  border-2 border-dotted ${!mode?"border-black font-bold text-black font-serif":"border-gray-400 text-white"} rounded-xl p-6 cursor-pointer hover:border-blue-400 transition`}
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
        <div className=" flex w-full mx-auto gap-6">
          <div className="uploadBox flex justify-center  align-middle flex-col bg-white/10 p-6 rounded-2xl w-[45%] h-80 sticky z-10">
            <label className="flex flex-col border-2 border-dashed p-6 items-center rounded-2xl ">
              <p>Drag & Drop</p>
              <p className="text-sm ">click to upload</p>
              <input
                type="file"
                className=" hidden "
                onChange={(e) => setFile(e.targer.files[0])}
              />
            </label>
            {file && (
              <p className="mt-3 text-sm text-center text-gray-300">
                {file.name}
              </p>
            )}
            <textarea
              name=""
              id=""
              className="p-6 mt-4 rounded-2xl border-2 border-dotted  "
              placeholder="Enter job description Here"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="resultBox flex flex-col bg-white/10 rounded-2xl p-6 ">
            <h2 className="mb-4 text-mono font-semibold text-blue-400 ">
              🤖 AI Suggestions
            </h2>
            <div className="flex bg-linear-to-r from-blue-600/10 to-purple-600/10 items-center justify-center ">
              <div className="relative mt-3">
                <Score score={result.score} />
              </div>
            </div>
            <div className="  flex flex-col gap-2 bg-linear-to-r from-blue-600/10 to-purple-600/10 p-4">
              <h2 className="text-blue-400 font-bold">Required Skills:</h2>
              <div className="  flex flex-wrap gap-2">
                {result?.skills?.map((skill, index) => (
                  <div className="p-2 shadow flex text-mono">
                    <span className="text-lg">💡</span>
                    <p className="text-sm">[{skill}]</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="  flex flex-col gap-2 bg-linear-to-r from-blue-600/10 to-purple-600/10 p-4">
              <h2 className="text-blue-400 font-bold">Found Skills:</h2>
              <div className="flex gap">
                <div className="  flex flex-wrap gap-2">
                  {result?.found?.map((skill, index) => (
                    <div className="p-2 shadow flex text-mono">
                      <span className="text-lg">💡</span>
                      <p className="text-sm">[{skill}]</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="  flex flex-col gap-2 bg-linear-to-r from-blue-600/10 to-purple-600/10 p-4">
              <h2 className="text-blue-400 font-bold">Missing Skills:</h2>
              <div className="  flex flex-wrap gap-2">
                {result?.missing?.map((skill, index) => (
                  <div className="p-2 shadow flex text-mono">
                    <span className="text-lg">💡</span>
                    <p className="text-sm">[{skill}]</p>
                  </div>
                ))}
              </div>
            </div>
            <div className=" p-4 bg-linear-to-r from-blue-600/10 to-purple-600/10 flex flex-col gap-2">
              <h2 className="text-blue-400 font-bold">Improving Suggetion:</h2>
              <div className="flex flex-col gap-2">
                {result.aiSuggestions.map((Suggestions, index) => (
                  <div className="p-2 shadow flex text-mono">
                    <span className="text-lg">💡</span>
                    <p className="text-sm">{Suggestions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
