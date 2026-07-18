import React, { createContext, useState } from 'react'
import API from '../api/axios'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const register = async (formData)=>{
        const res =await API.post("/auth/register",formData)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))

        setToken(res.data.token)
        setUser(res.data.user)

        return res.data
    }

    const login = async(formData)=>{
        const res =await API.post("/auth/login",formData)
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))

        setToken(res.data.token)
        setUser(res.data.user)
        return res.data
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken("")
        setUser(null)
    }

  return (
      <AuthContext.Provider value={{user,token,login,register,logout}}>
        {children}
      </AuthContext.Provider>
  )
}

export default AuthProvider
