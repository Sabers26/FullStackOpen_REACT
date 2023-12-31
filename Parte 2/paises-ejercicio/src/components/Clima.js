import React from "react";
import axios from "axios";

const access_key = "0e63044689bde25f535ec79cc87664bf"
const Clima = ({capital}) =>{
    const query = {
        "type": "City",
        "query": capital,
        "language": "es",
        "unit": "m"
    }
    axios.get(`https://api.weatherstack.com/current`, {params:query}).then(datos=>{
        console.log(datos.data)
    })

}

export default Clima;