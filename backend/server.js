const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()

const authRouter = require("./routes/authRoutes")
const expenseRouter = require("./routes/expenseRoutes")
const analyticsRouter = require("./routes/analyticsRouter")
const connectDB = require("./config/db")
const aiRouter = require("./routes/aiRoutes")

const app = express()
app.use(express.json())
app.use(cors())
connectDB()

app.use("/api/auth",authRouter)
app.use("/api",expenseRouter)
app.use("/api/analytics",analyticsRouter)
app.use("/api/ai",aiRouter)

app.listen(3000)