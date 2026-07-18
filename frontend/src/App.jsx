import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'
import AddExpense from './pages/AddExpense'
import TransactionList from './components/TransactionList'
import EditExpense from './pages/EditExpense'
import Insights from './pages/Insights'
import AiBot from './pages/AiBot'

const App = () => {
  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <Navbar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/addExpense' element={<AddExpense/>}/>
        <Route path='/editExpense/:id' element={<EditExpense/>}/>
        <Route path='/insights' element={<Insights/>}/>
        <Route path='/ai' element={<AiBot/>}/>
      </Routes>
    </div>
  )
}

export default App
