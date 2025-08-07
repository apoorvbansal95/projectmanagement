import React from 'react'
import Button from './Button'
export default function Sidebar({onStartAddProject, onProjectselect, projects, selectedProjectId}) {
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">ALL Projects </h2>
            <div>
            <Button onClick={onStartAddProject}>
                    + Add New project
                </Button>
            </div>
            
            <ul  className='mt-8'>
            {projects.map((prjct)=>{
            let cssClass= "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";
            if (prjct.id===selectedProjectId){
                cssClass+=' bg-stone-800 text-stone-200'
            }
            else{
                cssClass+=' text-stone-400'
            }

             return(               
            <li key={prjct.id}>
                <button 
                onClick={()=>onProjectselect(prjct.id)} 
                 className={cssClass}>
                    {prjct.title}
                </button>
            </li>)})}
            </ul>
        </aside>
    )
}
