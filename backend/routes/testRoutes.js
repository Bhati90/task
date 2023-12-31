const express = require("express");

const Task =require("../model/taskModel");
const { createTask, getTasks,getTask,deleteTask, updateTask} = require("../controller/taskController");
const router = express.Router()


// router.post("/",createTask).get("/",getTasks);

// router.get("/:id",getTask).put("/:id",updateTask).delete("/:id",deleteTask);


router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);


// router.put("/api/tasks/:id",updateTask)
module.exports = router;