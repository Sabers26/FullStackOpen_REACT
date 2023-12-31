import { useEffect, useState } from "react"
import Note from "./Notes.js"
import axios from "axios"
import noteServices from '../services/notes.js'

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    
    useEffect(()=> {
        console.log("effect")
        noteServices.getAll().then(response=>{
            setNotes(response.data)
        })
    }, [])
    const click = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date:new Date().toISOString(),
            important: Math.random()<0.5
        }

        noteServices.create(noteObject).then(response => {
            setNotes(notes.concat(noteObject))
            setNewNote("")
        })
        
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportanceOf = (id) =>{
        const url = `http://localhost:3001/notes/${id}`
        const note = notes.find(n => n.id === id)
        const changeNote = {...note, important: !note.important}

        noteServices.update(note.id, changeNote).then(response=>{
            setNotes(notes.map(note => note.id !== id ? note : response.data))
        }).catch(error =>{
            alert(`La nota con id ${note.content} ha sido eliminada del servidor`)
            setNotes(notes.filter(n => n.id !== id))
        })
    }
    const noteToShowAll = showAll ? notes : notes.filter(note => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>mostrar {showAll? "todas" : "importantes"}</button>
            <ul>
                {noteToShowAll.map(note=>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
                )}
            </ul>
            <form onSubmit={click}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}

export default App