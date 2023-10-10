import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const studentsData = () => {
    const students = localStorage.getItem('students')
    if(students){
        return JSON.parse(localStorage.getItem('students'))
    }
    else {
        return [];
    }
}

const Student = () => {

    const [inputData, setInputData] = useState({ id: uuidv4(), student_name: "", student_email: "" })
    const [students, setStudent] = useState(studentsData())
    const [singleStudent, setSingleStudent] = useState([])
    const [toggle, setToggle] = useState(false)
    const [studentEdit, setStudentEdit] = useState(null)

    // get all input value by one method
    const changeInputHandler = (property, value) => {
        setInputData(prevObj => ({
            ...prevObj,
            id: uuidv4(),
            [property]: value
        }))
    }

    // add student
    const addStudentHandler = () => { 
        setStudent([...students, inputData])
        resetData()
    }

    // student edit
    const studentEditHandler = (id) => { 
        console.log(id)
        const editValue = students.filter((student) => student.id === id)
        const [data] = editValue
        setInputData({
            student_name: data.student_name,
            student_email: data.student_email
        })
        setToggle(true)
        setStudentEdit(id)
     }

    // update student 
    const updateStudentHandler = () => {
        const updateStudent = students.map((CurentStudent) => {
            if(CurentStudent.id === studentEdit) {
                return {
                    ...CurentStudent, 
                    student_name: inputData.student_name,
                    student_email: inputData.student_email
                }
            }
            return CurentStudent;
        })
        setStudent(updateStudent)
        setToggle(false)
        resetData()
    } 

    // delete student
    const deleteStudent = (id) => {
        let result = students.filter((student) => student.id !== id)
        setStudent(result)
    }

    // show single student
    const showSingleStudent = (id) => {
        const singleData = students.filter((student) => student.id === id)
        setSingleStudent(singleData)
    }
    
    singleStudent.forEach(student => {
        console.log(student)
    });

 
    const resetData = () => {
        let resetData = setInputData({ id:"", student_name: "", student_email: "" })
        return resetData;
    }
    // use localStorage 
    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students))
    },[students])

     
    return(
        <>
            <div className="container" style={{ marginTop: "100px" }}>
                <div className="row">
                    {
                        students.map((student) => {
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
                            value={inputData.student_name}
                            onChange={(e) => { changeInputHandler('student_name', e.target.value) }}
                            className="form-control" 
                            placeholder="Student Name" 
                        />
                        <br />
                        <input 
                            type="text" 
                            value={inputData.student_email}
                            onChange={(e) => {changeInputHandler('student_email', e.target.value) }}
                            className="form-control" 
                            placeholder="Student Email" 
                        />
                        <br />
                        {toggle ===  true ? <button onClick={updateStudentHandler} className="btn btn-success">Update Student</button>  
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
                                    {singleStudent.map((student) => {
                                        return(
                                            <div className="dd" key={student.id}>
                                                <li>Student Id: {student.id}</li>
                                                <li>Student Name: { student.student_name }</li>
                                                <li>Student Email: { student.student_email }</li>
                                            </div>
                                        )
                                    })}
                                    
                                </ul>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Student