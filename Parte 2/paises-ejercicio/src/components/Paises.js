import React, { useEffect, useState } from "react";
import axios from "axios";

const Paises = () => {
    const [paises, addpaises] = useState([])

    const handleChangeInput = (event) =>{
        event.preventDefault()
        if(event.target.value < 1)
        {
            return
        }
        const url = "https://restcountries.com/v3.1/name/" + event.target.value
        axios.get(url).then(datos=>{
            addpaises(datos.data)
        })
    }
    return (
        <>
            <h1>Buscador de paises</h1>
            <div>
                <form>
                    Buscar: <input  onChange={handleChangeInput}></input>
                </form>
            </div>
            {paises.length > 10 ? (<p>Demasiados paises encontrados agregue una busqueda mas especifica</p>) : (paises.map(pais=>{
                if(paises.length === 1)
                {
                    return (
                    <>
                        <h1 key={pais.name.common}>Pais {pais.name.common} (Nombre oficial: {pais.name.official}</h1>)
                        <p key={pais.capital}>Capital: {pais.capital}</p>
                        <p key={pais.languages}>Lenguajes: </p>
                        {Object.keys(pais.languages).map(lang=>{
                            return <li key={pais.languages[lang]}>{pais.languages[lang]}</li>
                        })}
                        
                    </>
                    )
                }
                return <li key={pais["name"]["common"]}>{pais["name"]["common"]}</li>
            }))}
        </>
    )
}

export default Paises;