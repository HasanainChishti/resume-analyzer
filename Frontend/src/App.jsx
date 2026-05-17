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
            <div className="flex justify-between gap-4 text-purple-400 text-mono">
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
                className="shadow p-2 rounded hover:bg-gray-800 font-serif "
                onClick={() => setMode(!mode)}
              >
                {mode ? (
                  <span className="bg-gray-400 text-white text-xl px-3 py-2 rounded  hover:bg-gray-400 ">
                    ☾
                  </span>
                ) : (
                  <span className="">🔆</span>
                )}
              </button>
            </div>
          </nav>
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
