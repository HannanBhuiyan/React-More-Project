import React, { useEffect, useState } from 'react'

const WeatherApp = () => {

    const [data, setData] = useState(null)
    const [search, setSearch] = useState("Dhaka")

    let API = "049e6c1970f864ec5f2637dfb38fd77e";

    useEffect(() => {
        const featchApi = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${API}`
            const response = await fetch(url)
            let res = await response.json()
            setData(res)
        }
        featchApi()
    },[search])
 

    return (
        <>
            <div className="weather_app_section" style={{  marginTop: "100px"  }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="card p-3"> 
                                <div className="weather_inp mx-4">
                                    <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Enter Ciry name' className='form-control' />
                                </div>  
                                <div className="output text-center mt-3 mb-3">
                                    <h4>{search}</h4>
                                    {!data?.name ? ( <p>Not found</p> ) : (<h4>Today Temperature {data?.main.temp}°C</h4>)}
                                    <br />
                                    {!data?.name ? ( <p>Not found</p> ) : (<h4>Today Min Temperature {data?.main.temp_min}°C</h4>)}
                                    <br />
                                    {!data?.name ? ( <p>Not found</p> ) : (<h4>Today max Temperature {data?.main.temp_max}°C</h4>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherApp