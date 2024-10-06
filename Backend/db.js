const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://postmanapicheck:mongodbpassword@cluster0.gpwms9i.mongodb.net/paytm")

const userSchema=mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    username: String,
})
const user = mongoose.model("User",userSchema)

const bankSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required:true
    },
    balance: Number,
})

const accTable = mongoose.model("Account",bankSchema)

module.exports={user,accTable}