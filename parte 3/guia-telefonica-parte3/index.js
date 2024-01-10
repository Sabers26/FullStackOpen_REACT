const express = require("express");
const morgan = require("morgan")
const cors = require("cors")

const app = express()
app.use(cors())

const requestLogger = (request, response, next)=>{
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
app.use(express.json())

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
    morgan(':method :url :status :res[content-length] - :response-time ms')
})

app.get("/api/persons", (request, response) =>{
    response.json(persons);
    morgan(':method :url :status :res[content-length] - :response-time ms')
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
    morgan(':method :url :status :res[content-length] - :response-time ms')
})

app.delete("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    
    response.status(204).end()
    morgan(':method :url :status :res[content-length] - :response-time ms')
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
    morgan(':method :url :status :res[content-length] - :response-time ms')
})

app.get("/info", (request, response)=>{
    const people = persons.length
    const hora = new Date()

    response.send(`<h1>La agenda tiene informacion de ${people} personas</h1><br><p>${hora}</p>`);
    morgan(':method :url :status :res[content-length] - :response-time ms')
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
    morgan(':method :url :status :res[content-length] - :response-time ms')
}

app.use(unknownEndpoint)

const PORT = 3001

app.listen(PORT, () =>{
    console.log("servidor iniciado correctamente");
})