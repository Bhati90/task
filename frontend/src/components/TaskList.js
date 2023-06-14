import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TaskForm from './TaskForm'
import Task from './Task'
import axios  from "axios"
// const dotenv = require('dotenv')
// require('dotenv').config();

// import { URL } from '../App'
import loadingImg from "../assest/loader.gif"

const url = process.env.REACT_APP
const TaskList = () => {

    const [tasks,setTasks] = useState([])
   
    const [completedTasks,setCompletedTasks] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [formData,setFormData] = useState({
        name :"",
        des: "",
        completed:false
    })


    const [isEditing,setIsEditing] = useState(false)
    const [taskId,setTaskId] = useState("")
    const {name} = formData
 
   

    const handleInputChange = (e) =>{
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
      
    }

    const getTasks = async () =>{
        setIsLoading(true)
        try{
            const {data} = await axios.get(`${url}/api/tasks`)
           setTasks(data)
           console.log("user",formData)
            setIsLoading(false)
         setIsLoading(false)
        }catch(error){
            toast.error(error.message)
            console.log(error)
          setIsLoading(false)
        }
    };

    useEffect(()=>{
        getTasks()
    },[])



    const createTask = async (e) =>{
   e.preventDefault();
   if( formData.des === "" ){
    return toast.error("Input or des field cannot be empty")
   }
   else if(name === ""){
    return toast.error("Input or des field cannot be empty")
  
   }

   try{
    await axios.post(`http://localhost:5000/api/tasks`,formData)
    toast.success("task added successfully");
    setFormData({...formData,name:""} && {...formData,des:""})
    getTasks();
   }catch(error){
    toast.error(error.message)
    console.log (error)
   }
    }


    useEffect(()=>{
      const cTask = tasks.filter((task)=>{
        return task.completed === true
      })
      setCompletedTasks(cTask)
    },[tasks])

    const getSingleTask = async (task) =>{
        setFormData({name:task.name,completed:false,des:task.des})
        setTaskId(task._id)
        setIsEditing(true)
    }




    const updateTask = async (e) =>{
       e.preventDefault()
       if( formData.des === "" ){
        return toast.error("Input or des field cannot be empty")
       }
       else if(name === ""){
        return toast.error("Input or des field cannot be empty")
      
       }
       try{
        await axios.put(`http://localhost:5000/api/tasks/${taskId}`,formData)
        setFormData({...formData,name:"",des:""})
        setIsEditing(false)
   getTasks();
       }catch(error){
toast.error(error.message);
setIsEditing(false)
       }
    }

    const deleteTask = async (id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/tasks/${id}`)
        getTasks()
    }catch(error){
      toast.error(error.message)
        }

    }

    const setToComplete = async(task)=>{
        const newFormData = {
            name:task.name,
           completed:true,
        }
        try{
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`,newFormData)
            getTasks()
        }catch(error){
           toast.error(error.message)
        }
    }

  return (
    <div className='container'>
    <div>
      <h1>Task manager</h1>
      <TaskForm name = {name} des={formData.des} handleInputChange={handleInputChange} createTask={createTask} isEditing = {isEditing} updateTask = {updateTask} />
    
     <div >
     {tasks.length >0 && (<div className='--flex-between --pb'>
        <h3>
            <b>Total Tasks:</b>{tasks.length}

        </h3>
        <h3>
            <b>Completed Tasks:</b>{completedTasks.length}
        </h3>
      </div>)
      }
      </div>
      <hr/>
      {
        isLoading &&(
        <div className="--flex-center">
        <img src={loadingImg} alt = ""/>
        </div>)
      }
      {
        !isLoading && tasks.length === 0?(
           <p className='--py'> No task added</p>
        ):(
            <div className='tasks'>
            {tasks.map((task,index)=>{
            return <Task key = {task._id}  task = {task} index = {index} deleteTask = {deleteTask} setToComplete= {setToComplete}  getSingleTask = {getSingleTask}/>;
        })}</div>
        )
      }
</div>
    </div>
  )
}

export default TaskList
