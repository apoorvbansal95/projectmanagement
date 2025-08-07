import React from 'react'
import Newtask from './Newtask'

export default function Tasks({tasks, onAdd, onDelete}) {
  return (
    <section>
      <h2  className="text-2xl font-bold text-stone-700 mb-4">
        TASKS
      </h2>
      <Newtask onAdd={onAdd}/>
      {tasks.length===0 &&(<p className="text-stone-800 my-4"> No tasks assigned yet!!</p>)}
      <ul className="p-4 mt-8 rounded-md bg-stone-100">

      </ul>

    </section>
  )
}
