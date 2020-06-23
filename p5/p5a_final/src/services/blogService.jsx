import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'
// const baseUrl = 'https://phonebook-bend.herokuapp.com/api/persons'
// const baseUrl = '/api/blogs'/**use once integrated to b/end */

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const create = async newObj => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObj, config)
    return response.data
}

const update = async (id, newObj) => {
    const response = axios.put(`${baseUrl}/${id}`, newObj)
    return response.data
}

export default { getAll, create, update, setToken }
