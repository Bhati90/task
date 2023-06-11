const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB")
const Task =require("./model/taskModel")
const taskRoutes = require("./routes/testRoutes")
const cors = require("cors");

const app = express();

app.use(express.json())


app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001","https://task-manager.onrender.com","https://6485848d6038ce6c764f63ac--jovial-stroopwafel-fbd9c2.netlify.app/","https://frontend-qhcw.onrender.com/"],
}));
app.use("/api/tasks",taskRoutes)
// const logger = (req,res,next) =>{
//     console.log("Middleware ran");
//     console.log(req.method);
//     next();
// };

app.get("/",(req,res)=>{
    res.send("Home page");
})



const PORT = process.env.PORT || 5000;


const startServer = async () =>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`);
        
        });
    }
    catch(error){
console.log(error)
    }
}
startServer();