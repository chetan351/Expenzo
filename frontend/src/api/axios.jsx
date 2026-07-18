import axios from 'axios'

const API = axios.create({
    baseURL: 'https://expenzo-432l.onrender.com',
    timeout: 10000
})

API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token")

    if(token){
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})

export default API