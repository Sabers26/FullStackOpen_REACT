const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next)=>{
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

const notes = [
    {
        id: 1,
        content: "Contenido de la nota",
        important: true
    }
]

app.get("/", (request, response)=>{
    response.send("<h1>Bienvenido</h1>")
})

app.get("/api/notes", (request, response)=>{
    response.json(notes)
})

const PORT = 3001

app.listen(PORT, () =>{
    console.log("servidor iniciado correctamente");
})