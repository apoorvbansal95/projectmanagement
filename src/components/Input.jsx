import React from 'react'
const classes= "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
export default function Input({ref, label, isTextarea, ...props}) {
  return (
    <div>
      <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
        {label}
        </label>
      {isTextarea ?<textarea ref={ref}  className={classes}{ ...props}/>:<input ref={ref} className={classes}/>}
      </p>
    </div>
  )
}
