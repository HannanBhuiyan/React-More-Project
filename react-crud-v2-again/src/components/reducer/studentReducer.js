import { v4 as uuidv4 } from 'uuid';
export const initialState = {
    toggle: false,
    students: [
        { id: uuidv4(), student_name: "Jhon", student_email: "jhon@gmail.com" }
    ],
    showSingleStudent:[
        { id: uuidv4(), student_name: "", student_email: "" }
    ],
    editStudent: [
        { id: uuidv4(), student_name: "", student_email: "" }
    ]
}

export const reduce = (state, action) => {
    switch (action.type) {
        case 'add_new_student': 
            
            return {
                ...state,
                students: [...state.students, action.payload]
            }
        case "delete_student":
            let result = state.students.filter((student) => student.id !== action.payload)
            return {
                ...state,
                students: result
            }
        case "show_single_student":
            let singleStudentData = state.students.filter((student) => student.id === action.payload)
            return {
                ...state,
                showSingleStudent: singleStudentData,  
            }
        case "edit_student" : 
            let existsValue = state.students.filter((student) => student.id === action.payload)
            return {
                ...state,  
                editStudent: existsValue,
                toggle: true,  
            }
        default:
            return state;
    }
}
