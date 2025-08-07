import { useState } from "react";
import Newproject from "./components/Newproject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState]= useState({
    selectedProjectId:undefined,
    projects:[], 
    tasks:[]
  })
 function handlAddtask(text){
  setProjectState(prevState=>{
    const taskId=Math.random()
    const newtask={
      text:text, 
      projectId: prevState.selectedProjectId,
      id: taskId
    }
    return {
      ...prevState, 
      tasks:[...prevState.tasks, newtask]
    }
  })
 }

 function handleDeletetask(){

 }


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

 function handleSelectProject(id){
  setProjectState(prevState=>{
    return{
      ...prevState,
      selectedProjectId:id, 

    }
  })
 }
 function handleDelete(){
  setProjectState(prevState=>{
    return{
      ...prevState,
      selectedProjectId:undefined, 
      projects:prevState.projects.filter((project)=>project.id!==prevState.selectedProjectId)

    }
  })
 }

 const selectedProject= projectState.projects.find(project=>project.id===projectState.selectedProjectId)

  let content=<SelectedProject project={selectedProject} onDelete={handleDelete} onAddtask={handlAddtask} onDeletetask={handleDeletetask} />;
  if (projectState.selectedProjectId===null){
    content=<Newproject onAdd={handleAddproject} onCancel={handleCancel}/>
  }
  else if(projectState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddproject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">   
      <Sidebar onStartAddProject={handleStartAddproject}  onProjectselect={handleSelectProject}    projects={projectState.projects}/>
      {content}
    </main>
  );
}

export default App;
