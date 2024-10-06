const express = require("express");
const cors=require("cors")
const router = require("./routes/index.js");
const SECRETE_KEY = require("./routes/config.js")
require("dotenv").config()

const app = express();

const port = process.env.PORT

app.use(express.json());
app.use(cors())
app.use("/api/v1/",router)

app.get("/",(req,res)=>{
    res.send("sending")
})

app.use((err,req,res,next)=>{
    res.json({
        message:"somethign went wrong please rty again later",
        success:false
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});