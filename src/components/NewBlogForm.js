import React, { useState } from 'react'

const NewBlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    handleNewBlog({
      title,
      author,
      url
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }
  return (
    <div>
      <h4>Create new</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} type="text" name="Title" onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          <label>Author</label>
          <input value={author} type="text" name="Author" onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          <label>Url</label>
          <input value={url} type="text" name="Url" onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default NewBlogForm