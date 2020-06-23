import React, { useState } from 'react'
import Notification from './Notification'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [message, setMessage] = useState(null)

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setMessage(`${title} by ${author} is added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')

  }

  return (
    <div className="formDiv">
      <h2>Create a New Blog</h2>
      <Notification message={message} />

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            id="likes"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button id="btn-submit" type="submit">Create</button>
      </form>
    </div>

  )
}

export default BlogForm