const Expense = require("../models/expenseModel")

const getExpense = async(req,res)=>{
    const expense = await Expense.find({userID:req.user.id})
    return res.send(expense)
}

const getByIdExpense = async(req,res)=>{
    const expense = await Expense.findById(req.params.id)
    if(!expense){
        return res.status(400).send({message:"No user found"})
    }
    return res.send(expense)
}

const postExpense = async (req,res)=>{
    const title = req.body.title
    const amount = req.body.amount
    const category = req.body.category
    const type = req.body.type
    const date = req.body.date
    const userID = req.user.id

    if(!title ||!amount ||!category ||!type ||!date ||!userID ){
        return res.status(404).send({message:"All fields are required"})
    }

    const expense = new Expense({title:title,amount:amount,category:category,type:type,date:date,userID:userID})
    await expense.save()
    return res.send({message:"Added Successfully"})
}

const putExpense = async(req,res)=>{
    const expense = await Expense.findById(req.params.id)
    if(!expense){
        return res.status(400).send({message:"No user found"})
    }

    const title = req.body.title
    const amount = req.body.amount
    const category = req.body.category
    const type = req.body.type
    const date = req.body.date
    const userID = req.user.id

    if(!title ||!amount ||!category ||!type ||!date ||!userID ){
        return res.status(404).send({message:"All fields are required"})
    }

    expense.title = title
    expense.amount = amount
    expense.category = category
    expense.type = type
    expense.date = date
    expense.userID = userID
    await expense.save()
    return res.send({message:"Updated Successfully"})
}

const deleteExpense = async(req,res)=>{
    const expense = await Expense.findByIdAndDelete(req.params.id)
    if(!expense){
        return res.status(400).send({message:"No user found"})
    }
    return res.send({message:"Deleted Succesfully"})
}

module.exports = {getExpense,getByIdExpense,postExpense,putExpense,deleteExpense}