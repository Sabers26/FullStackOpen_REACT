const express = require("express");

const app = express()

const body_parser = require("body-parser")
app.use(body_parser.json())

var persons = [
    {
        "name": "Ada Lovelace",
        "number": "+56 9 8888 7777",
        "id": 1
    }
]

const generatedID = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(p=>p.id)) : 0
    return maxID+1
}

app.get("/", (request, response)=>{
    response.send("<h1>Inicio de backend</h1>");
})

app.get("/api/persons", (request, response) =>{
    response.json(persons);
})

app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id);
    const person = persons.find(p=> p.id === id);
    
    if(person)
    {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    
    response.status(204).end()
})

app.post("/api/persons", (request, response)=>{
    const newPerson = request.body
    
    if(!newPerson.name || !newPerson.number)
    {
        return response.status(400).json({error:"Agrege nombre y numero de celular"})
    }

    const coincidencia = persons.find(p => p.name === newPerson.name)

    if(coincidencia)
    {
        return response.status(400).json({error: `${newPerson.name} ya se encuentra agendado`})
    }
    const person = {
        name: newPerson.name,
        number: newPerson.number,
        id: generatedID()
    }

    persons = persons.concat(person)
    console.log(persons)
    response.json(person)
})

app.get("/info", (request, response)=>{
    const people = persons.length
    const hora = new Date()

    response.send(`<h1>La agenda tiene informacion de ${people} personas</h1><br><p>${hora}</p>`);
})

const PORT = 3001

app.listen(PORT, () =>{
    console.log("servidor iniciado correctamente");
})