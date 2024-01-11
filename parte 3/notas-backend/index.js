const express = require("express");
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
    console.log(`${request.method} - ${request.path} - ${request.body !== undefined ? request.body : ""}`);
    next();
}

app.get("/api/notes", (request, response)=>{
    
})