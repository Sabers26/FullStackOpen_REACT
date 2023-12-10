import { useEffect, useState } from "react"
import Note from "./Notes.js"
import axios from "axios"

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    
    useEffect(()=> {
        console.log("effect")
        axios.get("http://localhost:3001/notes").then(response=>{
            setNotes(response.data)
        })
    }, [])
    const click = (event) => {
        event.preventDefault()
        const noteObject = {
            id:notes.length+1,
            content: newNote,
            date:new Date().toISOString(),
            important: Math.random()<0.5
        }
        setNotes(notes.concat(noteObject))
        setNewNote("")
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const noteToShowAll = showAll ? notes : notes.filter(note => note.important)
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>mostrar {showAll? "todas" : "importantes"}</button>
            <ul>
                {noteToShowAll.map(note=>
                    <Note key={note.id} note={note}/>
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