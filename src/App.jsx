import { useState } from "react";
import Newproject from "./components/Newproject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";

function App() {
  const [projectState, setProjectState]= useState({
    selectedProjectId:undefined,
    projects:[]
  })
  function handleStartAddproject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:null, 

      }
    })
  }

 function handleAddproject(projectData){
  setProjectState(prevState=>{
    const newProject={
      ...projectData, 
      id: Math.random()
    }
    return {
      ...prevState, 
      selectedProjectId:undefined,
      projects:[...prevState.projects, newProject ]
    }
  })
 }

 function handleCancel(){
  setProjectState(prevState=>{
    return{
      ...prevState,
      selectedProjectId:undefined, 

    }
  })
 }


  let content;
  if (projectState.selectedProjectId===null){
    content=<Newproject onAdd={handleAddproject} onCancel={handleCancel}/>
  }
  else if(projectState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddproject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">   
      <Sidebar onStartAddProject={handleStartAddproject} projects={projectState.projects}/>
      {content}
    </main>
  );
}

export default App;
