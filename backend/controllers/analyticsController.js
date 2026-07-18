const Expense = require("../models/expenseModel")

const getAnalytics = async (req,res)=>{
    const expenses = await Expense.find({userID:req.user.id,type:"Expense"})

    const categoryTotals = {}
    let totalExpense = 0

    expenses.forEach((item)=>{
        totalExpense += Number(item.amount)
        if(categoryTotals[item.category]){
            categoryTotals[item.category] += Number(item.amount)
        }else{
            categoryTotals[item.category] = Number(item.amount)
        }
    })

    let maxAmount = 0
    let topCategory = ""

    for(const category in categoryTotals){
        if(categoryTotals[category]>maxAmount){
            topCategory = category
            maxAmount = categoryTotals[category]
        }
    }

    const percentage = ((maxAmount / totalExpense) * 100).toFixed(1)

    const insight = `You have spent most on ${topCategory}.It is ${percentage}% of the total expense.`

    res.json({
        insight,percentage,topCategory,maxAmount,totalExpense,categoryTotals
    })
}

module.exports = getAnalytics