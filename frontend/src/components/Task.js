import React from 'react'
import {FaCheckDouble,FaRegTrashAlt,FaEdit}from "react-icons/fa"
const Task = ({task,index,deleteTask,getSingleTask,setToComplete}) => {
  return (

    <div className={task.completed ? 'task completed' :'task'}>
       
<p>
    <b>{index+1}.</b>
    {task.name}

    <br/>
    <p className='des'>{task.des}</p>
   
   </p>
  
   <div className='task-icons'>
    <FaCheckDouble color = "green" onClick={()=>setToComplete(task)}/>
    <FaEdit color = "purple"  onClick={()=>getSingleTask(task)}/>
    <FaRegTrashAlt color= "red" onClick={()=>
        deleteTask(task._id)

    }/>
    
   </div>
    </div>
    
    
  )
}

export default Task
