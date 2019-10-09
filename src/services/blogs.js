import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl,newBlog,config)
  return request.then( response => response.data)
}

const update = changedBlog => {
  const id = changedBlog.id
  delete changedBlog.id
  changedBlog.user = changedBlog.user.id

  const request = axios.put(`${baseUrl}/${id}`, changedBlog)
  return request.then(response => response.data)
}

const remove = id => {
  //console.log(id)
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  addBlog,
  setToken,
  update,
  remove
}