import React from 'react'

const TaskForm = ({createTask,name,des,handleInputChange,isEditing,updateTask,desTask,isDes}) => {
  return (
    // <form className='task-form'onSubmit={isEditing?updateTask:createTask} >
     <form className='task-form'onSubmit={isEditing?updateTask:createTask} >
        <input type= "text" placeholder='add a task'
        name = "name" value = {name} onChange={handleInputChange}/>
     <input type= "text" placeholder='add a des'
        name = "des" value = {des} onChange={handleInputChange}/>
    
     <button type='submit'> {isEditing?"edit":"add"}</button>

    </form>
  )
}

export default TaskForm
