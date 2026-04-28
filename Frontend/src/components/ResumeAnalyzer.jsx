import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDesc,setJobDesc] = useState("");
  // const handleAnalyze = () => {
  // setLoading(true);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDesc",jobDesc);

    try {
      console.log("sahi he");

      const res = await axios.post("http://localhost:5000/upload", formData);
      console.log("ab bhi");

      // backend response set karo
      setResult({
        score: res.data.score,
        found: res.data.foundSkills,
        missing: res.data.missingSkills,
        aiSuggestions:res.data.aiSuggestions,
      });
    } catch (error) {
      console.log(error);
      alert("Error analyzing resume");
    }

    setLoading(false);
  };
  // };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex flex-col items-center p-6 text-white">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8"
      >
        🚀 Smart Resume Analyzer
      </motion.h1>
      {/* Upload Box */}
      {!result&&<div className="w-full max-w-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl text-center">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition">
          <p className="mb-2">📂 Drag & Drop Resume (PDF)</p>
          <p className="text-sm text-gray-300">or click to upload</p>

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
          className="w-full mt-4 text-white border-2 border-dotted border-gray-400 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="mt-5 w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>}
   
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
//         <div className="mt-8 w-full max-w-xl backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl">
//           {/* Score Circle */}
//           <div className="flex justify-center mb-6">
//             <div className="relative h-28 w-28">
//               <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
//               <div
//                 className="absolute inset-0 rounded-full border-4 border-green-400"
//                 style={{
//                   clipPath: `inset(${100 - result.score}% 0 0 0)`,
//                 }}
//               ></div>
//               <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
//                 {result.score}%
//               </div>
//             </div>
//           </div>

//           {/* Skills Found */}
          
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold text-green-400 mb-2">
//               ✅ Skills Found
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {result?.found?.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Missing Skills */}
//           <div>
//             <h2 className="text-lg font-semibold text-red-400 mb-2">
//               ❌ Missing Skills
//             </h2>
//             <div className="flex flex-wrap gap-2">
//               {result?.missing?.map((skill, i) => (
//                 <span
//                   key={i}
//                   className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//           {result?.aiSuggestions && (
  
// <div className="mt-6 w-full max-w-xl bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl">

//   <h2 className="text-xl font-semibold text-blue-400 mb-4">
//     🤖 AI Suggestions
//   </h2>

//   <div className="flex flex-col gap-3">
//     {result?.aiSuggestions?.map((item, i) => (
//       <div
//         key={i}
//         className="bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 px-4 py-3 rounded-lg flex items-start gap-3 hover:scale-[1.02] transition"
//       >
//         <span className="text-blue-400 text-lg">💡</span>
//         <p className="text-gray-200 text-sm leading-relaxed">
//           {item}
//         </p>
//       </div>
//     ))}
//   </div>

// </div>
// )}
//         </div>
<div className=" flex w-full mx-auto gap-6">
    <div className="uploadBox flex justify-center  align-middle flex-col bg-white/10 p-6 rounded-2xl w-[45%]">
     <label  className="flex flex-col border-2 border-dashed p-6 items-center rounded-2xl ">
      <p>Drag & Drop</p>
      <p className="text-sm ">click to upload</p>
      <input type="file" className=" hidden " onChange={(e)=>setFile(e.targer.files[0])} />
        
     </label>
    {
      file&& <p className="mt-3 text-sm text-center text-gray-300">{file.name}</p>
    }
     <textarea name="" id="" className="p-5 mt-4 rounded-2xl border-2 border-dotted " placeholder="Enter job description Here" value={jobDesc}  onChange={(e)=>setJobDesc(e.target.value)}></textarea>
    </div>
    <div className="resultBox flex flex-col bg-white/10 rounded-2xl p-6">
      <h2 className="mb-4 text-mono font-semibold text-blue-400 ">🤖 AI Suggestions</h2>
      <div className=" p-4 bg-linear-to-r from-blue-600/10 to-purple-600/10 flex flex-col gap-2">
         {
       result.aiSuggestions.map((Suggestions,index)=>(
          <div className="p-2 shadow flex text-mono">
          <span className="text-lg">💡</span>
              <p className="text-sm">{Suggestions}</p>
          </div>
       ))
      }
      </div>
     
    </div>
</div>
      )}
    </div>
  );
}
