const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name:String,
        email:{
            type:String,
            unique:true
        },
        password:String
    })
)

module.exports = User