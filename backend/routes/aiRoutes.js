const express = require("express")
const aiRouter = express.Router()
const getAIResponse = require("../controllers/aiController")
const authMiddleware = require("../middleware/authMiddleware")

aiRouter.post("/",authMiddleware,getAIResponse)

module.exports = aiRouter