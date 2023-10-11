import React, { createContext, useContext, useReducer } from "react";
import { initialState, reduce } from "../reducer/studentReducer";

const UserContext = createContext()



const StudetnProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reduce, initialState)

    return <UserContext.Provider value={{ state, dispatch }} >
        {children}
    </UserContext.Provider>
} 

const useStudentContext = () => {
    return useContext(UserContext)
}

export { useStudentContext, StudetnProvider }