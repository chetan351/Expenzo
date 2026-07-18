import React from 'react'
import { useState } from 'react'
import API from "../api/axios"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Insights = () => {
  const [analytics, setAnalytics] = useState({})

  const getAnalytics = async () =>{
    const res = await API.get("/analytics")
    setAnalytics(res.data)
  }
 const budget = 3000
  const totalExpense = analytics?.totalExpense
  const categoryTotals = analytics?.categoryTotals || {}
  
  
  useEffect(() => {
    getAnalytics()
  
  }, [])

  const categoryIcons = {
    Food: "🍔",
    Entertainment: "🍿",
    Groceries: "🛒",
    HealthCare: "🏥",
    "Rent & Fees": "🏠",
    Shopping: "🛍️",
    Transport: "🚕",
    Games: "🏐",
    Vehicle: "🏍️",
    Others: "🤷🏻‍♂️"
}
  
  return (
    <div className='w-screen'>
      {Object.keys(categoryTotals).length > 0?(<div>
        <div className='m-6 mx-8 mt-10 text-3xl font-bold p-5 rounded-3xl border-l-6 border-emerald-700 shadow-md shadow-emerald-900 text-emerald-900'>
        <h2 >Insights</h2>
      </div>
      <div className=' h-[30%] m-5 mx-15 mt-10 p-4 rounded-2xl bg-zinc-200 border-b-4 border-l-6 border-emerald-900 '>
        <h2 className='text-md font-medium '>--- {analytics?.insight}</h2>
      </div>

      {totalExpense>budget?<div className=' h-[30%] m-5 mx-15 mt-10 p-4 rounded-2xl bg-zinc-200 border-b-4 border-l-6 border-emerald-900  '>
        <h2 className='text-md font-medium '>--- You crossed your Expense Budget that is Rs.{budget} </h2>
      </div>:""}

      {Object.entries(categoryTotals).map(([category, amount]) => {
    return (
        <div
            key={category}
            className='h-[30%] m-5 mt-10 p-4 mx-15 rounded-2xl bg-zinc-200 border-b-4 border-l-6 border-emerald-900 '
        >
            <h2 className='text-md font-medium'>
                --- You have spent total of Rs. {amount}/- on {category} {categoryIcons[category]}.
            </h2>
        </div>
    )
})}
      </div>):( <div className='m-5 text-3xl mx-15 font-bold p-5 rounded-3xl border-l-6 border-emerald-700 shadow-sm shadow-emerald-900 text-emerald-900'>
        <h2 >You have no transaction history.</h2>
      </div>)}


    </div>
  )
}

export default Insights
