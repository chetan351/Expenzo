import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import {toast} from 'react-hot-toast'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const {login} = useContext(AuthContext)

    const loginHandler = async (e) =>{
        
        e.preventDefault()

        if(loading) return

        setLoading(true)

        const toastId = toast.loading("Logging In...")

        try{

          const formData = {
            email,
            password
          }

          await login(formData)

          toast.success("Logged-In Successfully",{
            id:toastId
          })

          navigate("/dashboard")

        }catch(error){

          toast.error(
            error.response?.data?.message || "Something went wrong",
            {
              id:toastId
            }
          )

        }finally{
          setLoading(false)
        }
    }

  return (
    <div className='min-h-screen w-full flex justify-center items-center bg-zinc-100 px-4 py-10'>

        <div className='rounded-2xl border-4 border-emerald-900 w-full max-w-md p-6 sm:p-10 bg-zinc-100'>

        <h2 className='text-2xl sm:text-3xl font-semibold text-center'>
          Login Page!
        </h2>

        <form onSubmit={loginHandler} className='flex flex-col gap-9 mt-11 '>

        <input 
          value={email} 
          onChange={(e)=>{
            setEmail(e.target.value)
          }} 
          className='text-base sm:text-xl font-semibold border-3 py-2 px-4 rounded-2xl outline-none autofill:bg-amber-50 border-emerald-900'  
          type="text" 
          name='email' 
          id='email'
          placeholder='Enter Your Email'
        />

        <input 
          value={password} 
          onChange={(e)=>{
            setPassword(e.target.value)
          }} 
          className='text-base sm:text-xl font-semibold border-3 py-2 px-4 rounded-2xl outline-none autofill:bg-amber-50 border-emerald-900'  
          type="password" 
          name="password" 
          id="password" 
          placeholder='Enter Your Password' 
        />

        <Link 
          to={'/registration'} 
          className='text-lg font-semibold underline'
        >
          New user? Register
        </Link>

        <button 
          disabled={loading}
          className={`text-xl font-semibold p-3 rounded-3xl text-white
          ${loading 
            ? "bg-gray-500 cursor-not-allowed" 
            : "bg-emerald-900 hover:bg-emerald-950"
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>

        </div>

    </div>
  )
}

export default Login