import React from 'react'
import { useState } from 'react'

const DisplayBlog = ({
  blog,
  updateBlog,
  handleRemoveBlog,
  likesCounter
}) => {
  // const [blogid, setBlogid] =useState('')
  const [showDetails, setShowDetails] = useState(false)
  const handleClick = () => {
    setShowDetails(!showDetails)
    // setBlogid(blog.id)
  }
  // console.log('Display ' + blogid)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlogLikes = () => {
    updateBlog(blog.id)//pass to App
  }

  const deleteBlog = () => {
    handleRemoveBlog(blog.id)
  }
  return (
    <div/* style={blogStyle}*/>

      {!showDetails
        ?
        <div>
          <label>{blog.title}</label>
          <button onClick={handleClick}>view</button>
        </div>
        :
        <div style={blogStyle}>
          <p>{blog.id}</p>
          <label className="title">{blog.title}</label>
          <button onClick={handleClick}>hide</button>
          <p className="author">{blog.author}</p>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <label>{likesCounter} likes</label>
          <button onClick={updateBlogLikes}>like</button>
          <br/>
          <button onClick={deleteBlog}>remove</button>
        </div>
      }

    </div>
  )
}

export default DisplayBlog