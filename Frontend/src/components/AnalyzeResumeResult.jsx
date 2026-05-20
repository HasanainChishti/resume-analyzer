import React from 'react'
import { useContext } from 'react';
import themeContext from './ThemeContext';
import Score from "../components/Score.jsx"
const AnalyzeResumeResult = ({file,jobDesc,result}) => {
      const theme = useContext(themeContext)
   const mode =theme.mode;
  return (
       <div className={`${!mode?"bg-linear-to-r from-blue-600/10 to-purple-600/10":"bg-linear-to-br from-gray-900 to-gray-800"} flex w-full mx-auto gap-6 mt-10`}>
          <div className={`uploadBox flex justify-center  align-middle flex-col shadow  bg-linear-to-r from-purple-600/10 to-blue-600/10 p-6 rounded-2xl w-[45%] h-80 sticky z-10`}>
            <label className="flex flex-col border-2 border-dashed p-6 items-center rounded-2xl ">
              <p>Drag & Drop</p>
              <p className="text-sm ">click to upload</p>
              <input
                type="file"
                className=" hidden "
                // onChange={(e) => setFile(e.targer.files[0])}
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
            //   onChange={(e) => setJobDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="resultBox flex flex-col bg-linear-to-r from-purple-400/10 to-blue-600/10 rounded-2xl p-6 ">
            <h2 className="mb-4 text-mono font-semibold text-blue-400 ">
              🤖 AI Suggestions
            </h2>
            <div className="flex  items-center justify-center ">
              <div className="relative mt-3">
                <Score score={result.score} />
              </div>
            </div>
            <div className="  flex flex-col gap-2  p-4">
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
            <div className="  flex flex-col gap-2   p-4">
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
            <div className="  flex flex-col gap-2  p-4">
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
            <div className=" p-4  flex flex-col gap-2">
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
  )
}

export default AnalyzeResumeResult
