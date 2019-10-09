import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    cursor: 'pointer'
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      handleRemove(blog)
    }
  }

  const blogInfo = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        { user.username === blog.user.username && <button onClick={remove}>Remove</button> }
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className="blogInfo" onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      { visible && blogInfo() }
    </div>
  )


}

export default Blog