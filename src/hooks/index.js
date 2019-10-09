import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
        if (event.target) {
            setValue(event.target.value)
        } else {
            setValue(event)
        }
        
    }
  
    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])
    
    const formatToken = token => {
        return `bearer ${token}`
    }

    useEffect( () => {
        const request = axios.get(baseUrl)
        request
            .then(response => {
                setResources(response.data.sort((a, b) => b.likes - a.likes))
            })
            .catch(err => console.log(err))
    }, [baseUrl])

    const addBlog = (newBlog, token) => {
        const config = {
            headers: { Authorization: formatToken(token) },
        }
        
        const request = axios.post(baseUrl,newBlog,config)
        return request.then( response => {
                setResources(resources.concat(response.data))
                return response.data
            })
            .catch(err => err.response)
    }
    
    const update = changedResource => {
        const id = changedResource.id
        delete changedResource.id
        
        const request = axios.put(`${baseUrl}/${id}`, {...changedResource, user: changedResource.user.id })

        request.then(response => {

            setResources( resources.map(resource => {
                if(resource.id !== response.data.id)
                    return resource
                else {
                    response.data.user = changedResource.user 
                    return response.data
                }
            }))
        })
        .catch( err => err.response)
    }
    
    const remove = (id, token) => {
        const config = {
            headers: { Authorization: formatToken(token) },
        }
        
        const request = axios.delete(`${baseUrl}/${id}`, config)
        return request.then(response => {

                setResources(resources.filter(resource => resource.id !== id))
                return response
            })
            .catch(err => err.response)
    }

    return [resources, {addBlog, update, remove}]
}


    
    
