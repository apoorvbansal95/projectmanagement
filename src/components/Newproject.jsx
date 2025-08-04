import React, { useRef, useState } from 'react'
import Input from './Input'
import Modal from './Modal'
export default function Newproject({onAdd, onCancel}) {
    const modal = useRef()
   const title =useRef()
   const description=useRef()
   const duedate=useRef()

   function handleSave(){
    const enteredTitle=title.current.value
    const enteredDescription=description.current.value
    const entereddueDate=duedate.current.value

    //.... validation
    if(enteredTitle.trim()==='' || enteredDescription.trim()===''|| entereddueDate.trim()===''){
        modal.current.open()
        return 
    }

    onAdd({
        title:enteredTitle, 
        description:enteredDescription, 
        duedate:entereddueDate
    })
   }

    return (
        <>
        <Modal ref={modal}>
            <h2 className="text-xl font-bold text-stone-500 my-4">Invalid inputs</h2>
            <p className="text-stone-400 mb-4">ooppps, forgot something</p>
        </Modal>
        <div className="w-[35rem] mt-16" >
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>Cancel</button></li>
                <li><button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button></li>
            </menu>
            <div>
                <Input type="text" ref={title} label='Title' />
                <Input ref={description} label='Description' isTextarea />
                <Input type="date" ref={duedate} label='Due Date' />

            </div>
        </div>
        </>
    )
}
