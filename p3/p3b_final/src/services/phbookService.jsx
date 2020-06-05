import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = 'https://phonebook-bend.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObj => {
    return axios.post(baseUrl, newObj)
}

const update = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj)
}

// const remove = id => {
//     console.log(id)
//     console.log(`${baseUrl}/${id}`)

//     return axios.delete(`${baseUrl}/${id}`, { params: { id: id } })
    
// }

export default { getAll, create, update/*, remove*/ }
