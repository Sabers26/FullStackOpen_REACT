import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = () =>{
    return axios.get(baseUrl)
} 

const create = (newPerson)=>{
    return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) =>{
    console.log("este es el id", id)
    console.log("este es la persona", newPerson)
    return axios.put(`${baseUrl}/${id}`, newPerson)
}

const deletePerson = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, deletePerson}