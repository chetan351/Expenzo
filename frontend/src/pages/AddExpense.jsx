import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { CarTaxiFront, Clapperboard, Cross, Hamburger, Handbag, House, Motorbike, ShoppingCart, Volleyball } from 'lucide-react'
import {toast} from 'react-hot-toast'

const AddExpense = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("Food")
    const [date, setDate] = useState("")
    const [type, setType] = useState("Expense")

    const addHandler =async (e)=>{
        e.preventDefault()

        try{
            const formData = {
            title,
            amount,
            category,
            type,
            date
        }

        const res = await API.post("/expense",formData)

        toast.success("Transaction Added Successfully")
        navigate("/dashboard")
        }catch(error){
        toast.error(error.response.data.message)
        }
        

        setTitle("")
        setAmount("")
        setCategory("")
        setDate("")
        setType("")
    }

    const cancel = ()=>{
        navigate("/dashboard")
    }

  return (
      <div className='min-h-screen w-full flex justify-center items-center bg-zinc-100 px-4 py-8'>
        <div className='rounded-2xl bg-white shadow-md shadow-zinc-400 w-full max-w-2xl p-5 sm:p-10'>
        <h2 className='text-2xl font-medium flex items-center'>💵 Add Transaction</h2>
        <p className='text-sm text-zinc-800'>Record a new transaction to track your spending</p>
        <form onSubmit={addHandler} className='flex flex-col gap-6 mt-11 '>
        <div className='flex flex-col justify-center'>
            <p className='text-lg text-zinc-800'>Transaction Title :</p>
        <input value={title} onChange={(e)=>{
            setTitle(e.target.value)
        }} className='text-xl border-2 rounded-lg border-zinc-500 px-3 py-1 mt-1' type="text" name="title" id="title" placeholder='e.g Weekly Groceries'/>
        </div>
        <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col justify-center '>
                <p className='text-lg text-zinc-800'>Amount :</p>
        <input value={amount} onChange={(e)=>{
            setAmount(e.target.value)
        }} className='text-xl w-full border-2 rounded-lg border-zinc-500 px-3 py-1 mt-1' type="number" name="amount" id="amount" placeholder='$ 0.0'/>

            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-lg text-zinc-800'>Category</p>
        
           <select value={category} onChange={(e)=>{
            setCategory(e.target.value)
           }} className='text-zinc-700 text-xl w-[101%] border-2 rounded-lg border-zinc-500 px-3 py-1 mt-1' name="category" id="category">
            <option value="Food"> 🍔Food</option>
            <option value="Entertainment">🍿 Entertainment</option>
            <option value="Groceries">🛒 Groceries</option>
            <option value="HealthCare">🏥 HealthCare</option>
            <option value="RentAndFees">🏠 Rent & Fees</option>
            <option value="Shopping">🛍️ Shopping</option>
            <option value="Transport">🚕 Transport</option>
            <option value="Games">🏐 Games</option>
            <option value="Vehicle">🏍️ Vehicle</option>
            <option value="Others">🤷🏻‍♂️ Others</option>
           </select>
          </div>
            </div>

        <div className='flex flex-col justify-center'>
            <p className='text-lg text-zinc-800'>Type :</p>
        <select value={type} onChange={(e)=>{
            setType(e.target.value)
        }} className='text-xl text-zinc-700 border-2 rounded-lg border-zinc-500 px-3 py-1 mt-1' name="type" id="type">
            <option value="Expense">🔻Expense</option>
            <option value="Income">🔺Income</option>
        </select>
        
        </div>

          <div className='flex flex-col justify-center mb-5'>
            <p className='text-lg text-zinc-800'>Transaction Date :</p>
        <input value={date} onChange={(e)=>{
            setDate(e.target.value)
        }} className='text-xl border-2 text-zinc-500 rounded-lg border-zinc-500 px-3 py-1 mt-1' type="date" name="date" id="date"/>
        </div>

        <div className='flex justify-between items-center'>
            <button className='text-xl bg-emerald-900 text-white px-5 py-2 rounded-2xl w-[57%]'>Add Transaction</button>
            <button onClick={cancel} className='text-xl bg-zinc-500 text-white px-5 py-2 rounded-2xl w-[35%]'>Cancel</button>
        </div>
      </form>
        </div>
    </div>
  )
}

export default AddExpense
