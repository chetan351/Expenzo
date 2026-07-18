import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Registration = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { register } = useContext(AuthContext)

    const registrationHandler = async (e) => {

        e.preventDefault()

        if (loading) return

        setLoading(true)

        try {

            const formData = {
                name,
                email,
                password
            }

            await register(formData)

            toast.success("Registration Complete")

            navigate("/")

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong")

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-zinc-100 px-4 py-10'>

            <div className='rounded-2xl border-6 border-emerald-900 lg:h-[66%] sm:w-[70%] md:w-[50%] lg:w-[33%] p-10'>

                <h2 className='text-2xl sm:text-3xl font-semibold text-center'>
                    Registration Page!
                </h2>

                <form onSubmit={registrationHandler} className='flex flex-col gap-9 mt-11'>

                    <input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className='text-base sm:text-xl font-semibold border-3 py-2 px-4 rounded-2xl outline-none border-emerald-900'
                        type="text"
                        placeholder='Enter Your Name'
                    />

                    <input
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className='text-base sm:text-xl font-semibold border-3 py-2 px-4 rounded-2xl outline-none border-emerald-900'
                        type="text"
                        placeholder='Enter Your Email'
                    />

                    <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='text-base sm:text-xl font-semibold border-3 py-2 px-4 rounded-2xl outline-none border-emerald-900'
                        type="password"
                        placeholder='Enter Your Password'
                    />

                    <button
                        disabled={loading}
                        className={`text-xl font-semibold p-3 rounded-3xl text-white transition-all duration-300
                        
                        ${loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-emerald-900 hover:bg-emerald-950"
                        }`}
                    >

                        {loading ? "Registering..." : "Register"}

                    </button>

                </form>

            </div>

        </div>
    )
}

export default Registration