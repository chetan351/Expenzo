import React, { useEffect, useState } from 'react'
import { Utensils,Trash2,Pencil, Plus} from 'lucide-react'
import {Link, useNavigate} from 'react-router-dom'
import API from '../api/axios'
import {toast} from 'react-hot-toast'

const TransactionList = ({expenses,getExpenses}) => {
  const navigate = useNavigate()
    
    const deleteExpense = async(id) =>{
      try{
        await API.delete(`/expense/${id}`)
      toast.success("Deleted Successfully!")
      getExpenses()
      }catch(error){
        toast.error(error.response.data.message)
      }
    }

  return (
    <div className='bg-white rounded-2xl shadow-lg p-4 sm:p-6 mx-2 sm:mx-8 my-4 border border-zinc-200 overflow-x-auto'>

  <div className='flex flex-wrap gap-3 items-center justify-between mb-6'>
    <h2 className='text-3xl font-semibold text-emerald-900 border-l-4 border-emerald-800 ps-2'>
      Transactions
    </h2>
    <button onClick={()=>{navigate("/addExpense")}} className='bg-emerald-700 rounded-xl p-1 hover:bg-emerald-600 me-2'><Plus size={30} color='white'/></button>
  </div>
  <div className='overflow-x-auto rounded-xl border border-zinc-200'>

    <div className='grid grid-cols-5 min-w-[700px] bg-zinc-100 px-6 py-4 text-zinc-600 font-semibold text-sm'>
      <h2>Title</h2>
      <h2>Category</h2>
      <h2>Date</h2>
      <h2>Amount</h2>
      <h2>Operations</h2>
    </div>

    {expenses.map((expense,idx)=>{
        return <div key={idx} className='grid grid-cols-5 min-w-[700px] items-center px-6 py-5 hover:bg-zinc-50 transition border-t border-zinc-200'>

      <div className='flex items-center gap-3'>
        <div>
          <h3 className='font-semibold text-zinc-800'>
            {expense.title}
          </h3>
        </div>
      </div>
      <div>
        <span className='bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium'>
          {expense.category}
        </span>
      </div>
      <h2 className='text-zinc-600'>
        {expense.date.slice(0,10)}
      </h2>
      {expense.type == "Expense" ?<h2 className='text-red-500 font-bold'>
        - ${expense.amount}/-
      </h2> : <h2 className='text-green-500 font-bold'>
        + ${expense.amount}/-
      </h2>}
    <h2 className='flex gap-3 items-center'>
      <Link to={`/editExpense/${expense._id}`} className='rounded-xl bg-amber-400 text-yellow-800 font-semibold p-2 '><Pencil/></Link>
      <button onClick={()=>{
        deleteExpense(expense._id)
      }} className='rounded-xl bg-red-600 text-white font-semibold p-2 '><Trash2 /></button>
    </h2>
    </div>
    })}

    
  </div>
</div>
  )
}

export default TransactionList
