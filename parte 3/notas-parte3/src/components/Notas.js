import React, { useState } from "react";

const generatedID = (array) =>{
    const id = array.lenght > 0 ? Math.max(...array.map(nota=>nota.id)) : 0
    return id + 1;
}

const InputNotas = ({value, handle}) => {
    if(value.lenght === 0)
    {
        return <input placeholder="Escriba la nota..." onChange={handle}></input>
    }
    else
    {
        return <input value={value} onChange={handle}></input>
    }
} 
const Notas = () =>{
    const [notas, setNotas] = useState([])
    const [nuevaNota, setNuevaNota] = useState("")
    const [importancia, setImportancia] = useState(false)
    
    const handleChangeText = (event) =>{
        setNuevaNota(event.target.value)
    }

    const handleCheckChange = () =>{
        setImportancia(!importancia)
    }

    const guardarNota = (event) =>{
        event.preventDefault(); //Detenemos el metodo submit para que no haga el envio de datos
        const nota = {
            id: generatedID(notas),
            content: nuevaNota,
            important: importancia
        }
        setNotas(notas.concat(nota))
        setNuevaNota("")
    }
    return (
        <>
            <h1>Libreta de notas</h1>
            <form onSubmit={(event) => guardarNota(event)}>
                <label>Agregar nueva nota</label><br/>
                <InputNotas value={nuevaNota} handle={(event)=>handleChangeText(event)}/>
                <br/><button type="submit">Guardar Nota</button> Importante: <input type="checkbox" checked={importancia} onChange={()=>handleCheckChange()}></input>
            </form>
        </>
    )
}

export default Notas;

/*<>
            <h1>Libreta de notas</h1>
            <form onSubmit={(event) => guardarNota(event)}>
                <label>Agregar nueva nota</label><br/>
                {nuevaNota==="" && <input placeholder="Escriba la nota..." onChange={(event) => handleChangeText(event)}></input>}
                {nuevaNota!=="" && <input value={nuevaNota} onChange={(event) => handleChangeText(event)}></input>}
                <br/><button type="submit">Guardar Nota</button> Importante: <input type="checkbox" checked={importancia} onChange={()=>handleCheckChange()}></input>
            </form>
        </>*/