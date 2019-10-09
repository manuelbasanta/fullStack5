import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import { useField, useResource } from './hooks/index'

import NewBlogFrom from './components/NewBlogForm'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, blogsService] = useResource('/api/blogs')
  const [eventMsg, setEventMsg] = useState({ msg: '', type: '' })
  
  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

  useEffect( () => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  const handleLogin = event => {
    event.preventDefault()
    loginService.login({ 
      username:username.value, 
      password: password.value
    })
      .then( response => {
        window.localStorage.setItem('loggedUser', JSON.stringify(response))
        blogsService.setToken(response.token)
        setUser(response)
        username.onChange('')
        password.onChange('')
      })
      .catch( error => {
        setEventMsg({ msg: 'wrong username or password', type: 'error' })
        setTimeout(() => {
          setEventMsg({ msg: '', type: '' })
        }, 5000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleNewBlog = async newBlog => {

    blogFormRef.current.toggleVisibility()
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const addedBlog = await blogsService.addBlog(newBlog, token)
    if (addedBlog.title) {
      setEventMsg({ msg: `A new blog ${addedBlog.title} by ${addedBlog.author} was added`, type: 'success' })
      setTimeout(() => {
        setEventMsg({ msg: '', type: '' })
      }, 5000)
    } else {
      setEventMsg({ msg: 'Could not create blog', type: 'error' })
      setTimeout(() => {
        setEventMsg({ msg: '', type: '' })
      }, 5000)
    }
  }

  const handleLike = blogToChange => {
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    blogsService.update(changedBlog)
  }

  const handleRemove = async blogToRemove => {
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const deleted = await blogsService.remove(blogToRemove.id, token)
    if(deleted.data.error) {
        setEventMsg({ msg: 'Could not delete blog', type: 'error' })
        setTimeout(() => {
          setEventMsg({ msg: '', type: '' })
        }, 5000)
    } else {
        setEventMsg({ msg: 'Blog successfully deleted', type: 'success' })
        setTimeout(() => {
          setEventMsg({ msg: '', type: '' })
        }, 5000) 
    }
  }
  const setContent = () => {
    if ( user === null) {
      return (
        <div>
          <h1>Log in to application</h1>
          <Notification notification={eventMsg} />
          <form onSubmit={handleLogin}>
            <div>
              <label>Username</label>
              <input {...username} name="Username"/>
            </div>
            <div>
              <label>Password</label>
              <input {...password} name="Password"/>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={eventMsg} />
        <h4>{user.username} loggen in</h4>
        <button onClick={handleLogout} >logout</button>
        <Togglable buttonLabel="New note" ref={blogFormRef}>
          <NewBlogFrom handleNewBlog={handleNewBlog}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user}/>
        )}
      </div>
    )
  }
  return (
    <div className="App">
      {setContent()}
    </div>
  )
}

export default App
