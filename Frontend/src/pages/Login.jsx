import { useState } from "react";
import { Form, useNavigate } from "react-router";

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
  return (
    <div className="min-h-screen flex justify-center items-center align-middle bg-white/10 ">
            {  
           login?(<div  className=" flex flex-col gap-3 shadow w-80 h-85 p-4 rounded  bg-linear-to-r from-blue-600/10 to-purple-600/10">
               <h2 className="text-xl text-center font-bold">Signup</h2>
      <form onSubmit={(e)=>handleSignup(e)} className=" flex flex-col gap-3  rounded ">

                     
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          id="name"
          value={name}
          className="shadow p-2 rounded outline-black"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          id="Email"
          value={email}
          placeholder="Eneter Email"
          className="shadow p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          name=""
          id="password"
          placeholder="Enter password"
           className="shadow p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="text-white bg-gray-950 text-mono p-2 rounded shadow">signup</button>
       
      </form>
       <p className="text-gray-600">already signup ? <button className="text-gray-700 hover:border-b-2" onClick={()=>setLogin(!login)}>Login</button></p>
      </div>):(
        <div  className=" flex flex-col gap-3 shadow w-80 h-65 p-4 rounded  bg-linear-to-r from-blue-600/10 to-purple-600/10">
               <h2 className="text-xl text-center font-bold">Login</h2>
      <form onSubmit={(e)=>handleLogin(e)} className=" flex flex-col gap-3  rounded ">

                     
       
        <input
          type="text"
          id="Email"
          value={email}
          placeholder="Eneter Email"
          className="shadow p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label htmlFor=""></label> */}
        <input
          type="text"
          name=""
          id="password"
          placeholder="Enter password"
           className="shadow p-2 rounded"
          value={password}
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
