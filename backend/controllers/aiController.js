const { model } = require("mongoose")
const Expense = require("../models/expenseModel")
const axios = require("axios")


const getAIResponse = async (req,res)=>{
    const {prompt} = req.body

    if(!prompt){
        return res.status(400).json({
            message:"Prompt is Required"
        })
    }

    const expenses = await Expense.find({userID:req.user.id})

    const expenseCategoryTotal = {}
    const incomeCategoryTotal = {}
    let totalExpense = 0
    let totalIncome = 0

    expenses.forEach((item)=>{
        if(item.type == "Expense"){
            totalExpense += Number(item.amount)

                if(expenseCategoryTotal[item.category]){
                    expenseCategoryTotal[item.category] += Number(item.amount)
                }else{
                    expenseCategoryTotal[item.category] = Number(item.amount)
            }
        }

        if(item.type == "Income"){
            totalIncome += Number(item.amount)

                if(incomeCategoryTotal[item.category]){
                    incomeCategoryTotal[item.category] += Number(item.amount)
                }else{
                    incomeCategoryTotal[item.category] = Number(item.amount)
                }
        }
    })

    let topExpenseCategory = ""
    let topIncomeCategory = ""
    let maxExpenseAmount = 0
    let maxIncomeAmount = 0

    for(const category in expenseCategoryTotal){
        if(expenseCategoryTotal[category]>maxExpenseAmount){
            topExpenseCategory=category
            maxExpenseAmount=expenseCategoryTotal[category]
        }
    }

    
    for(const category in incomeCategoryTotal){
        if(incomeCategoryTotal[category]>maxIncomeAmount){
            topIncomeCategory=category
            maxIncomeAmount=incomeCategoryTotal[category]
        }
    }

    const aiPrompt = `You are a smart financial assistant .Here is the users financial data : Expense Categories in which they have spended ${expenseCategoryTotal},Income Categories in which they have recieved money ${incomeCategoryTotal},Total Expense of theirs ${totalExpense},Total Income of theirs ${totalIncome},Highest expense Category :${topExpenseCategory},Highest Income Category :${topIncomeCategory},Highest expense ${maxExpenseAmount},Highest Income ${maxIncomeAmount},Their All expenses ${expenses} ,these are the users transaction data and u have to give response ONLY considering these provided data and the user should not feel like it is AI generated response as it is a website(Personal Expense Tracker)'s ChatBot . The user Question is :${prompt}`

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            model:"openai/gpt-3.5-turbo",
            messages:[
                {
                    role:"user",
                    content:aiPrompt
                }
            ]
        },
        {
            headers:
            {
                Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type":"application/json"
            }
        
        }
    )

    return res.json({response:response.data.choices[0].message.content})
}

module.exports = getAIResponse