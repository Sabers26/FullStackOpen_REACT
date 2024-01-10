import React, { useEffect, useState } from "react";
import telf from "../services/telf";
import Message from "./Message";

const Guia = () =>{
    const [persons, setPersons] = useState([])
    const [newPerson, setNewPerson] = useState({name:"", number:""})
    const [notification, setnoti] = useState("")

    useEffect(() => {
        telf.getAll().then(response=>{
            setPersons(response.data)
        })
    }, [])

    const handleNameChange = (event) =>{
        setNewPerson({name: event.target.value, number: newPerson.number})
    }

    const handleNumberChange = (event) => {
        setNewPerson({name: newPerson.name, number: event.target.value})
    }

    const enviar = (event) => {
        event.preventDefault()
        if(persons.find((person)=> person.name===newPerson.name) && window.confirm(`Esta seguro de querer actualizar el numero de celular de ${newPerson.name}?`)===true)
        {
            const personFind = persons.find(person => person.name === newPerson.name)
            const newData = {...personFind, number: newPerson.number}
            telf.update(newData.id, newData).then(() => {
                setPersons((listaVieja) => listaVieja.map(person => person.id === newData.id ? newData : person))
                setnoti(`${newData.name} fue actualizado correctamente!`)
            }).catch((error)=>{
                    
            })
        }
        else{
            telf.create(newPerson).then(()=>{
                setPersons(persons.concat(newPerson))
                setnoti(`${newPerson.name} fue agregado correctamente!`)
            }).catch((error)=>{
                setnoti(`${newPerson.name} fue eliminado del servidor`)
            })
        }
        setNewPerson({name:"", number:""})
    }

    const deletePerson = (person) =>{
        if(window.confirm(`Esta seguro de querer eliminar a ${person.name}?`) === true)
        {
            telf.deletePerson(person.id).then(() => {
                setPersons(persons.filter(p => p.id !== person.id))
                setnoti(`${person.name} fue eliminado correctamente`)
            }).catch((error)=>{
                setnoti(`${person.name} Ya habia sido eliminado del servidor`)
            })
        }
    }
    return (
        <div>
            <form onSubmit={enviar}>
                name: <input value={newPerson.name} onChange={handleNameChange}></input>
                number: <input value={newPerson.number} onChange={handleNumberChange}></input>

                <button type="submit">Guardar contacto</button>
            </form>
            <Message content={notification}/>
            <h1>Contactos</h1>
            <ul>
                {persons.map((person)=> <><li key={person.name} >{person.name} {person.number}</li> <button onClick={() => deletePerson(person)}>Eliminar</button></>)}
            </ul>
        </div>
    )
}

export default Guia;