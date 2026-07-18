const mongoose = require("mongoose")

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expenzo"

    try {
        await mongoose.connect(mongoURI)
        console.log("Connected to DB")
    } catch (error) {
        console.error("MongoDB connection error:", error.message)
    }
}

module.exports = connectDB