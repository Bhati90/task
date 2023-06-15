const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB")
const Task =require("./model/taskModel")
const taskRoutes = require("./routes/testRoutes")
const cors = require("cors");
const logger = require("./Middleware/logger");

const app = express();

app.use(express.json())


// app.use(cors({
//     origin:["http://localhost:3000","http://localhost:3001","https://task-manager.onrender.com","https://6485848d6038ce6c764f63ac--jovial-stroopwafel-fbd9c2.netlify.app/","https://frontend-qhcw.onrender.com/"],
// }));
app.use(cors(
//     {
//     origin:["https://mern-task-app.onrender.com","http://localhost:3000","http://localhost:5000"],
// }
));
// app.use("/api/tasks",taskRoutes)


// app.get("/",(req,res)=>{
//     res.send("Home page");
// })



const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({ extended: false }));
"app.use(cors(*));"
app.use("/api/tasks", taskRoutes);

// Load React App in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", logger, (req, res) => {
    res.send("Welcome to the home page");
  });
}

// Connect DB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    })
  )
  .catch((err) => console.log(err));
// const startServer = async () =>{
//     try {
//         await connectDB();
//         app.listen(PORT,()=>{
//             console.log(`server is running on port ${PORT}`);
        
//         });
//     }
//     catch(error){
// console.log(error)
//     }
// }
// startServer();