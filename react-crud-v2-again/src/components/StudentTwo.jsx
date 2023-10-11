import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { initialState, reduce } from "./reducer/studentReducer";
import { useStudentContext } from "./context/UserContext";

const studentsData = () => {
    const students = localStorage.getItem('students')
    if(students){
        return JSON.parse(localStorage.getItem('students'))
    }
    else {
        return [];
    }
}



const StudentTwo = () => {

    const {state, dispatch} = useStudentContext()

    // const [inputData, setInputData] = useState()

    const [studentName, setStudentName] = useState("")
    const [studentEmail, setStudentEmail] = useState("")


    const [studentEdit, setStudentEdit] = useState(null)


    const [student] = state.showSingleStudent
    const [oldStudent] = state.editStudent

   
 

  
   
    // get all input value by one method
    // const changeInputHandler = (property, value) => {
    //     setInputData(prevObj => ({
    //         ...prevObj,
    //         id: uuidv4(),
    //         [property]: value
    //     }))
    // }
  

    // add student
    const addStudentHandler = () => { 
        let newData = {
            id: uuidv4(),
            student_name: studentName,
            student_email: studentEmail
        }
        dispatch({
            type: 'add_new_student',
            payload: newData
        })
        // resetData()
    }

    // student edit
    const studentEditHandler = (id) => { 
        dispatch({
            type: "edit_student",
            payload: id
        })
     }

    // update student 
    const updateStudentHandler = () => {
        // const updateStudent = students.map((CurentStudent) => {
        //     if(CurentStudent.id === studentEdit) {
        //         return {
        //             ...CurentStudent, 
        //             student_name: inputData.student_name,
        //             student_email: inputData.student_email
        //         }
        //     }
        //     return CurentStudent;
        // })
        // // setStudent(updateStudent)
        // setToggle(false)
        // resetData()
    } 

    // delete student
    const deleteStudent = (id) => {
        dispatch({ type: 'delete_student', payload: id }) 
    }

    // show single student
    const showSingleStudent = (id) => {
        dispatch({
            type: 'show_single_student',
            payload: id
        })
    }
 
    const resetData = () => {
        let resetData = setInputData({ id:"", student_name: "", student_email: "" })
        return resetData;
    }

    // use localStorage 
    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(state.students))
    },[state.students])

     
    return(
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row">
                    {
                        state.students.map((student) => {
                            const {id, student_email, student_name } = student 
                            return(
                                <div className="col-md-3" key={id}>
                                    <div className="card p-3 bg-dark mb-5 text-white">
                                        <h5>Name: {student_name}</h5>
                                        <h5>Email: {student_email}</h5>
                                        <div className="btn_group d-flex"> 
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { showSingleStudent(id) }} className="btn btn-success mt-2 me-2" >View</button>
                                            <button onClick={() => { deleteStudent(id) }} className="btn btn-danger mt-2 me-2" >Delete</button>
                                             <button onClick={() => {studentEditHandler(id)}} className="btn btn-info mt-2 me-2" >Edit</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })   
                    } 
                </div>
                <br />
                 <hr />
                 <br />
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <input 
                            type="text"
                            value={ state.toggle === true ? oldStudent.student_name : studentName}
                            onChange={(e) => { setStudentName(e.target.value) }}
                            className="form-control" 
                            placeholder="Student Name" 
                        />
                        <br />
                        <input 
                            type="text"  
                            value={studentEmail}
                            onChange={(e) => { setStudentEmail(e.target.value) }}
                            className="form-control" 
                            placeholder="Student Email" 
                        />
                        <br />
                        {state.toggle ===  true ? <button onClick={updateStudentHandler} className="btn btn-success">Update Student</button>  
                        :
                        <button onClick={addStudentHandler} className="btn btn-success">Add Student</button> }
                        
                    </div>
                </div>
                {/* single student view modal */}
                <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <ul> 
                                   <div className="student_singledata">
                                        <li>ID: {student.id}</li>
                                        <li>Student Name: {student.student_name}</li>
                                        <li>Student Email: {student.student_email}</li>
                                   </div>
                                </ul>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentTwo