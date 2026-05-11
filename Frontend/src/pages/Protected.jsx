import React from 'react'
import {Route,Routes,BrowserRouter, useNavigate} from "react-router"

const Protected = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    if(!token)
        navigate('/history')
  return (
   <ProtectedRoute>
   <History/>
</ProtectedRoute>
  )
}

export default Protected
