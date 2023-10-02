import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
 
const getAllData = () => {
    let list = localStorage.getItem('lists')
    if(list){
        return JSON.parse(localStorage.getItem('lists'))
    }
    else {
        return [];
    }
}


const Index = () => {

    // manage all state
    const [names, setNames] = useState(getAllData())
    const [dataToggle, setDataToggle] = useState(false)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState("")

    const [inputData, setInputData] = useState({
        id: uuidv4(),
        name: "",
        description: ""
    })
 
    // control all input 
    const onInputChangeHandler = (property, value) => {
       setInputData(prevObj => ({
            ...prevObj,
            id: uuidv4(),
            [property]:value
       }) )
    }
      
    // add new student info
    const addHandler = (e) => {
        e.preventDefault()  
        setNames([...names, inputData])
        setInputData({id: "", name: "", description: ""})
    }

    
    // edit student
    const editHandler = (id) => {
        let updateName = names.filter((name) => name.id === id )
        const [data] = updateName
        setInputData({
            name: data.name,
            description: data.description
        })
        setDataToggle(true)
        setEditId(id)
    }

    // update student
    const updateHandler = () => {
        let updateItem = names.map((currEle) => {
            if(currEle.id === editId){
                return {
                    ...currEle,
                    name: inputData.name,
                    description: inputData.description
                }
            }
            return currEle;
  
        })
        setNames(updateItem)
        setDataToggle(false)
        setInputData({id: "", name: "", description: ""})
    }

    // delete items
    const deleteHandler = (id) => {
        let newData = names.filter((ele) => ele.id !== id)
        setNames(newData)
    }

    // delete all
    const allDataDelete = () => {
        setNames([])
    }

     

    // handle localStorage
    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(names))
    },[names])

  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-8 m-auto">
                <div className="add_section"> 
                    <label>Name</label>
                    <input 
                    type="text" 
                    className='form-control'
                    value={inputData.name}
                    onChange={(e) => {onInputChangeHandler("name", e.target.value)}}
                    />
                    <label className='mt-3'>Description</label>
                    <textarea 
                        value={inputData.description}
                    onChange={(e) => { onInputChangeHandler("description", e.target.value) } }
                    id="" cols="30" rows="5" className='form-control mt-2'></textarea>
                    {dataToggle ? <button type='submit' onClick={updateHandler} className='btn btn-info mt-3'>Update</button>  
                    : 
                    <button type='submit' onClick={addHandler} className='btn btn-success mt-3'>Add</button>  
                    } 
                </div>

                <div className="form_list mt-5 card p-3">
                    <div className="top d-flex justify-content-between align-items-center">
                        <div className="one">
                            <input type="text" onChange={(e) => { setSearch(e.target.value) }} className='form-control' placeholder='search' />
                        </div> 
                        <div className="one">
                            <button onClick={allDataDelete} className='btn btn-danger'>Delete All</button>
                        </div>
                    </div>
                    <table className="table table-bordered mt-4">
                        <thead>
                            <tr>
                                <th scope="col">
                                  #
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th> 
                            </tr>
                        </thead>
                        <tbody>

                        {names.length >= 1 ? <>
                            {names.filter((item) => search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search) ).map((ele, index) => {
                                const {name, description, id} = ele;  
                                return(
                                   <tr key={id}> 
                                       <td>{index+1}</td>
                                       <td>{name}</td>
                                       <td>{description}</td>
                                       <td>
                                           <a href="#" className='btn btn-info'>View</a>
                                           <button onClick={() => editHandler(id)} className='btn btn-success mx-3'>Edit</button>
                                           <button onClick={() => deleteHandler(id) } className='btn btn-danger'>Delete</button>
                                       </td>
                                   </tr> 
                               ) 
                           })}
                        </> 
                        : 
                         <tr>
                            <td colSpan={3}><h3 style={{ color: "red" }}>Data not fouund</h3></td>
                         </tr>
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index