import React, { useState, useRef, useEffect } from "react";
import './Calculator.css'

const Calculator = () => {


     const [result, setResult] = useState("")
     const inputRef = useRef(null);

     // for input result focus
     useEffect( () => inputRef.current.focus())

     // add number one by one
     const handelClick = (e) => {
          setResult(result.concat(e.target.name))
     }

     // clear number one by one
     const handelBackspace = () => {
          setResult(result.slice(0, -1))
     }

     // for clear all number
     const handelClear = () => {
          setResult("")
     }

     // for result
     const handerResult = () => {
          try{
               setResult(eval(result).toString())
          }
          catch(error) {
               setResult("Wrong !!!")
          }
     }

     return(
          <>
               <div className="cal-app" style={{ marginTop: '100px'  }}>
                   <div className="container">
                         <div className="row">
                              <div className="col-md-4 m-auto">
                                   <div className="cal-res">
                                        <form>
                                             <input type="text" value={result} ref={inputRef} className="res-fm" />
                                        </form>
                                   </div>
                                   <div className="cal-keypad">
                                        <button onClick={handelClear} id="clear">Clear</button>
                                        <button onClick={handelBackspace} id="backspace">C</button>
                                        <button name="+" onClick={handelClick} >+</button>
                                        <button name="9" onClick={handelClick} >9</button>
                                        <button name="8" onClick={handelClick} >8</button>
                                        <button name="7" onClick={handelClick} >7</button>
                                        <button name="-" onClick={handelClick} >-</button>
                                        <button name="6" onClick={handelClick} >6</button>
                                        <button name="5" onClick={handelClick} >5</button>
                                        <button name="4" onClick={handelClick} >4</button>
                                        <button name="*" onClick={handelClick} >&times;</button>
                                        <button name="3" onClick={handelClick} >3</button>
                                        <button name="2" onClick={handelClick} >2</button>
                                        <button name="1" onClick={handelClick} >1</button>
                                        <button name="/" onClick={handelClick} >/</button>
                                        <button name="0" onClick={handelClick} >0</button>
                                        <button name="." onClick={handelClick} >.</button>
                                        <button onClick={handerResult} id="result">Result</button>
                                   </div>
                              </div>
                         </div>
                   </div>
               </div> 
          </>
     )

}

export default Calculator;