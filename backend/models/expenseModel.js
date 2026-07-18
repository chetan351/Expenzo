const { default: mongoose } = require("mongoose");

const Expense = mongoose.model(
    "Expense",
    new mongoose.Schema({
        title:String,
        amount:Number,
        category:String,
        type:String,
        date:Date,
        userID:mongoose.Schema.Types.ObjectId
    })
)

module.exports = Expense