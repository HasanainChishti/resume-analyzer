import { useContext, useState } from "react";
import { Form, useNavigate } from "react-router";
import themeContext from "../components/ThemeContext";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login,setLogin] = useState(1);
  const navigate = useNavigate()
console.log(login);

  const handleSignup =async  (e)=>{
          e.preventDefault();
           console.log("yes ",e);
       const res =await fetch("http://localhost:5000/signup",{
             method:"POST",
             headers:{
              "content-type":"application/json"
             },
             body:JSON.stringify({
              name,
              email,
              password,
             })
         })
         const data =  await res.json();
         console.log(data);
         
  }
  const handleLogin = async (e)=>{
         e.preventDefault();
     const res = await fetch("http://localhost:5000/login",{
       method:"POST",
       headers:{
        "content-type":"application/json"
       },
       body:JSON.stringify({
        email,
        password,
       })
     })
     const data = await res.json();
     console.log(data);
      localStorage.setItem("token",data.token)
      navigate("/History")
  }
  const theme = useContext(themeContext)
  console.log("theme in history",theme.mode);
  
  return (
    <div className={`min-h-screen flex justify-center items-center align-middle  ${theme.mode?"bg-linear-to-r from-gray-900 to-gray-950":"bg-linear-to-r from-blue-600/10 to-purple-600/10"} `}>
            {  
           login?(<div  className=") flex flex-col gap-3 shadow w-80 h-85 p-4 rounded  bg-linear-to-r from-blue-600/25 to-purple-600/25">
               <h2 className={`text-xl text-center ${theme.mode&&"text-gray-200"} font-bold`}>Signup</h2>
      <form onSubmit={(e)=>handleSignup(e)} className={` flex flex-col gap-3 ${theme.mode?"text-gray-200 font-serif text-mono":"text-black font-serif"} rounded `}>

                     
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          id="name"
          value={name || "Enter Name"}
          className={`shadow p-2 rounded ${theme.mode?"text-gray-300 ":"text-gray-950"} outline-black`}
          // placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          id="Email"
          value={email ||"Enter Email" }
          // placeholder=" Eneter Email"
          className="shadow p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          name=""
          id="password"
          // placeholder="Enter password"
           className="shadow p-2 rounded"
          value={password ||"Enter password" }
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-white bg-gray-950 text-mono p-2 rounded shadow">signup</button>
       
      </form>
       <p className={`${theme.mode?"text-gray-300 font-serif text-sm":"text-gray-950 font-serif text-sm"}`}>already signup ? <button className={` ${theme.mode?"text-gray-300":"text-gray-700"} hover:border-b-2`} onClick={()=>setLogin(!login)}>Login</button></p>
      </div>):(
        <div  className=" flex flex-col gap-3 shadow w-80 h-65 p-4 rounded  bg-linear-to-r from-blue-600/10 to-purple-600/10">
               <h2 className="text-xl text-center font-bold">Login</h2>
      <form onSubmit={(e)=>handleLogin(e)} className=" flex flex-col gap-3  rounded ">

                     
       
        <input
          type="text"
          id="Email"
          value={email || "Enter Email"}
          // placeholder="Eneter Email"
          className="shadow p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          name=""
          id="password"
          // placeholder="Enter password"
           className="shadow p-2 rounded"
          value={password || "Enter password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-white bg-gray-950 text-mono px-2 py-2 rounded shadow">Login</button>
       
      </form>
       <p className="text-gray-600">new user ? <button className="text-gray-700 hover:border-b-2" onClick={()=>setLogin(!login)}>signup</button></p>
      </div>
      )
}
    </div>
  );
};
export default Login;
