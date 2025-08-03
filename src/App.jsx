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

  let content;
  if (projectState.selectedProjectId===null){
    content=<Newproject/>
  }
  else if(projectState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddproject}/>
  }
  return (
    <main className="h-screen my-8 flex gap-8">   
      <Sidebar onStartAddProject={handleStartAddproject}/>
      {content}
    </main>
  );
}

export default App;
