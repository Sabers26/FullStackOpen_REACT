import React, { useState } from "react";

const Guia = () =>{
    const [persons, setPersons] = useState([])
    const [newPerson, setNewPerson] = useState({name:"", number:""})
    
    const findPerson = persons.find((person)=> person.name===newPerson.name)

    const handleNameChange = (event) =>{
        setNewPerson({name: event.target.value, number: newPerson.number})
    }

    const handleNumberChange = (event) => {
        setNewPerson({name: newPerson.name, number: event.target.value})
    }

    const enviar = (event) => {
        event.preventDefault()
        if(findPerson)
        {
            alert(`${newPerson.name} Ya se encuentra registrado`)
        }
        else{
            setPersons(persons.concat(newPerson))
        }
        setNewPerson({name:"", number:""})
    }

    return (
        <div>
            <form onSubmit={enviar}>
                name: <input value={newPerson.name} onChange={handleNameChange}></input>
                number: <input value={newPerson.number} onChange={handleNumberChange}></input>

                <button type="submit">Guardar contacto</button>
            </form>
            <h1>Contactos</h1>
            <ul>
                {persons.map((person)=> <li key={person.name} >{person.name} {person.number}</li>)}
            </ul>
        </div>
    )
}

export default Guia;