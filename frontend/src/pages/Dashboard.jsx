import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import SummaryCard from '../components/SummaryCard'
import TransactionList from '../components/TransactionList'
import API from '../api/axios'

const Dashboard = () => {

  const {user,token} = useContext(AuthContext)
  const [expenses, setExpenses] = useState([])

    const getExpenses = async()=>{
        const res = await API.get("/expense")
        setExpenses(res.data)        
    }

    
    
   
   useEffect(() => {
    getExpenses()
    }, [])

  return (
    <div className='min-h-screen w-full bg-zinc-100 pb-10'>
      <h2 className='px-4 pt-4 text-base sm:text-xl text-emerald-800'>Welcome ,<span className='text-xl font-bold text-emerald-800'>{user?.name}</span></h2>
      <SummaryCard expenses={expenses} />
      <TransactionList expenses={expenses} getExpenses={getExpenses}/>
      
    </div>
  )
}

export default Dashboard