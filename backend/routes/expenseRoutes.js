const express = require("express")
const { getExpense, postExpense, putExpense, deleteExpense, getByIdExpense } = require("../controllers/expenseController")
const authMiddleware = require("../middleware/authMiddleware")
const expenseRouter = express.Router()

expenseRouter.get("/expense",authMiddleware,getExpense)
expenseRouter.get("/expense/:id",authMiddleware,getByIdExpense)
expenseRouter.post("/expense",authMiddleware,postExpense)
expenseRouter.put("/expense/:id",authMiddleware,putExpense)
expenseRouter.delete("/expense/:id",authMiddleware,deleteExpense)

module.exports =  expenseRouter
