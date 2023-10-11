import React from "react";
// import Student from "./components/Student";
import StudentTwo from "./components/StudentTwo";
import { StudetnProvider } from "./components/context/UserContext";

const App = () => {
  return(
    <>
      <StudetnProvider>
          <StudentTwo />
      </StudetnProvider>
    </>
  )
}

export default App;