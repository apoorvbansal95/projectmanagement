import React, { useState } from 'react'

export default function Newtask({onAdd}) {
    const [tasks, settasks]=useState([])
    const [enteredtask, setenteredtask]= useState("")
    function handleClick(){
        onAdd(enteredtask)
        setenteredtask("")
    }
    function handleChange(e){

        setenteredtask(e.target.value)
    }

  return (
    <div className="flex items-center gap-4"> 
      <input className="w-64 px-2 py-1 rounded-sm bg-stone-200" value={enteredtask} type="text" onChange={handleChange}/>
      <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>
        Add Task
      </button>
    </div>
  )
}
