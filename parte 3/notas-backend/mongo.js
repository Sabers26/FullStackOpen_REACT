const mongoose = require("mongoose");

if(process.argv.length < 3)
{
    console.log("Porfavor ingrese la contraseña como argumento: node mongo.js <password>")
    process.exit(1)
}

const password=process.argv[2]

const url = `mongodb+srv://saber:${password}@cluster0.oub79uy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content:String,
    date: Date,
    important: Boolean,
});

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
    content: "Contenido de prueba",
    date: new Date(),
    important: true,
})

note.save().then(result => {
    console.log("La nota ha sido guardada")
    mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})