import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router";
const History = () => {
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState();
  console.log(history);
   const token = localStorage.getItem('token');
   const navigate = useNavigate();
   if(!token)
    navigate('/signup')
  useEffect(() => {
    async function getHistori() {
      try {
        const res = await fetch("http://localhost:5000/history");
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.log(error);
      }
    }
    getHistori();
  }, []);
  useEffect(()=>{
    const exist = localStorage.getItem("token");

  },[])
  const handleDelete = async (id)=>{
         try {
            await fetch(`http://localhost:5173/history/${id}`,{
                method:"DELETE"
                })
                const filter = history.filter((list)=> list._id !== id)
                setHistory(filter);
         } catch (error) {
            console.log(error);
            
         }
  }
  return (
    // bg-linear-to-r from-blue-600/10 to-purple-600/10
<div className=" p-6 flex gap-5 bg-linear-to-r from-blue-600/10 to-purple-600/10 ">
      <div className="bg-white/10  flex flex-col gap-2 w-[30%] p-4 shadow">
        <h2 className="text-xl text-blue-600 ">📜 History</h2>
        {history.map((list) => (
          <div
            className="border-s-2 flex flex-col rounded gap-2  shadow bg-linear-to-r from-blue-600/10 to-purple-600/10 text-mono p-2"
            onClick={() => setSelected(list)}
          >
            <p className="">resumeName:{list.resumeName}</p>
            <div className="flex justify-between">
                <p className="">
              Score:
              <span className=" px-2 rounded font-bold">{list.score}</span>
            </p>
            <button className="bg-green-400 px-2 rounded" onClick={()=>handleDelete(list._id)}>Delete</button>
            </div>
            
          </div>
        ))}
      </div>
     <div className="bg-linear-to-r from-blue-600/10 to-purple-600/10 flex flex-col gap-3 w-[65%] p-6 shadow">
      {selected ? (
       <>
          <h2 className="text-xl text-blue-400 mb-4">
          ResumeName:  📄{selected.resumeName}
          </h2>

          <p className="mb-2">Score: {selected.score}%</p>

          {/* Found Skills */}
          <div className="mb-3">
            <h2 className="text-green-400">Found Skills</h2>
            <div className="flex flex-wrap gap-2">
              {selected.foundSkills.map((list, ind) => (
                <span className="bg-green-500/20 px-2 rounded">{list}</span>
              ))}
            </div>
          </div>
          
          {/* Missing Skills */}
          <div className="mb-3">
            <div>
              <h2 className="text-red-400">Missing Skills</h2>
              <div className="flex flex-wrap gap-2">
                {selected.missingSkills.map((list, ind) => (
                  <span className="bg-red-500/20 px-2 rounded">{list}</span>
                ))}
              </div>
            </div>
          </div>
          {/* Suggestion */}
          <div>
            <div>
              <h2 className="text-blue-400">Ai Suggestions</h2>
              <div className="flex flex-col gap-4">
                {selected.suggestions.map((list, ind) => (
                  <span className="text-sm bg-gray-200 p-2 rounded"><span className="text-mono">💡</span>{list}</span>
                ))}
              </div>
            </div>
          {/* </div> */}
        </div>
        </>
      ):(
        <p className="text-gray-400 text-center">Select History item</p>
      )}
      </div>
    </div>
  );
};
export default History;
// import { useEffect, useState } from "react";

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/history")
//       .then(res => res.json())
//       .then(data => setHistory(data));
//   }, []);

//   return (
//     <div className="flex gap-6 p-6">

//       {/* LEFT LIST */}
//       <div className="w-[35%] bg-white/10 p-4 rounded-xl">
//         <h2 className="text-blue-400 mb-3">📜 History</h2>

//         {history.map((item) => (
//           <div
//             key={item._id}
//             onClick={() => setSelected(item)}
//             className="p-3 mb-2 rounded-lg cursor-pointer hover:bg-white/20 transition"
//           >
//             <p className="text-sm">{item.resumeName}</p>
//             <p className="text-xs text-gray-400">{item.score}%</p>
//           </div>
//         ))}
//       </div>

//       {/* RIGHT DETAIL */}
//       <div className="w-[65%] bg-white/10 p-6 rounded-xl">
//         {selected ? (
//           <>
//             <h2 className="text-xl text-blue-400 mb-4">
//               📄 {selected.resumeName}
//             </h2>

//             <p className="mb-2">Score: {selected.score}%</p>

//             {/* Found */}
//             <div className="mb-3">
//               <h3 className="text-green-400">Found Skills</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selected.foundSkills.map((s, i) => (
//                   <span key={i} className="bg-green-500/20 px-2 rounded">
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Missing */}
//             <div className="mb-3">
//               <h3 className="text-red-400">Missing Skills</h3>
//               <div className="flex flex-wrap gap-2">
//                 {selected.missingSkills.map((s, i) => (
//                   <span key={i} className="bg-red-500/20 px-2 rounded">
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Suggestions */}
//             <div>
//               <h3 className="text-blue-400">AI Suggestions</h3>
//               {selected.suggestions.map((s, i) => (
//                 <p key={i} className="text-sm">💡 {s}</p>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-400 text-center">
//             Select a history item
//           </p>
//         )}
//       </div>

//     </div>
//   );
// };

// export default History;
