const express = require("express")
const analyticsRouter = express.Router()
const authMiddleware = require("../middleware/authMiddleware")

const getAnalytics = require("../controllers/analyticsController")


analyticsRouter.get("/",authMiddleware,getAnalytics)

module.exports = analyticsRouter