import React, { useState } from "react";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import History from "./pages/History";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router";
import Login from "./pages/Login";
import ThemeContext from "./components/ThemeContext";
import { Link } from "react-router";
const App = () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  const [mode, setMode] = useState(1);
  const [size, setSize] = useState(1);
  console.log("mode in app.jsx", mode);

  return (
    <>
      {/* <BrowserRouter> */}
      {
        <ThemeContext.Provider value={{ mode, setMode }}>
          <nav
            className={`flex justify-between p-4 w-full ${!mode ? "bg-linear-to-r from-blue-600/10 to-purple-600/10 shadow" : "bg-linear-to-br from-gray-900 to-gray-800"} `}
          >
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 font-serif">
              <span className="text-white">🤖</span>ResumeAnalyzer
            </h2>
            <div className="hidden lg:flex justify-between gap-4 text-purple-400 text-mono">
              <Link
                to={"/"}
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
              >
                {" "}
                Home
              </Link>
              <Link
                to={"/History"}
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
              >
                {" "}
                History
              </Link>
              <Link
                to={"/signup"}
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
              >
                Signup
              </Link>
              <button
                className="shadow p-2 rounded  font-serif "
                onClick={() => setMode(!mode)}
              >
                {!mode ? (
                  <span className=" text-black text-xl font-extrabold px-3 py-2 rounded  ">
                    ☾
                  </span>
                ) : (
                  <span className="font-extrabold">🔆</span>
                )}
              </button>
            </div>
            {
              size?( <div className="flex flex-row w-8 gap-1.5 lg:hidden cursor-pointer " onClick={()=>setSize(!size)}>
              <div className="w-1 h-full rounded bg-white"></div>
              <div className="w-1 h-full rounded bg-white"></div>
              <div className="w-1 h-full rounded bg-white"></div>
            </div>):( <div className="flex flex-col w-8 gap-1.5 lg:hidden cursor-pointer " onClick={()=>setSize(!size)}>
              <div className="w-full h-1 rounded bg-white"></div>
              <div className="w-full h-1 rounded bg-white"></div>
              <div className="w-full h-1 rounded bg-white"></div>
            </div>) 
              
          
}
          </nav>

        {
                size&&<div className={`lg:hidden text-purple-400 flex flex-col  gap-3 justify-center items-center ${!mode ? "bg-linear-to-r from-blue-600/10 to-purple-600/10 shadow" : "bg-linear-to-br from-gray-900 to-gray-800"} h-50 w-full`}>
    <Link
                to={"/"}
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
              >
                {" "}
                Home
              </Link>
              <Link
                to={"/History"}
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
              >
                {" "}
                History
              </Link>
              <Link
                to={"/signup"}
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
              >
                Signup
              </Link>
              <button
                className="shadow p-2 rounded  font-serif "
                onClick={() => setMode(!mode)}
              >
                {!mode ? (
                  <span className=" text-black text-xl font-extrabold px-3 py-2 rounded  ">
                    ☾
                  </span>
                ) : (
                  <span className="font-extrabold">🔆</span>
                )}
              </button>
                </div>
}
          <Routes>
            <Route path="/" element={<ResumeAnalyzer />}>
              {" "}
            </Route>
            <Route path="/history" element={<History></History>}></Route>
            <Route path="/signup" element={<Login />}></Route>
          </Routes>
        </ThemeContext.Provider>
      }
      {/* </BrowserRouter> */}
    </>
  );
};

export default App;
