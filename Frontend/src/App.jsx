import React from 'react'
import ResumeAnalyzer from './components/ResumeAnalyzer'
import History from "./pages/History"
import {Route,Routes,BrowserRouter, useNavigate} from "react-router"
import Login from './pages/Login'
const App = () => {
 
  const token = localStorage.getItem("token");
  console.log("yes",token);
  
  return (
   <>
   {/* <BrowserRouter> */}
   <Routes>
    <Route path="/" element={<ResumeAnalyzer/>}> </Route>
    <Route path="/history" element={<History></History>}></Route>
    <Route path='/signup' element={<Login/>}></Route>
   </Routes>
   {/* </BrowserRouter> */}
  
   </>
  )
}

export default App
