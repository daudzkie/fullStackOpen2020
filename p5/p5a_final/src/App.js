import React, { useState, useEffect } from 'react'
import DisplayBlog from './components/DisplayBlog'
import blogService from './services/blogService'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])/**[] parameter executes hook the first component is rendered */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])/**[] parameter executes hook the first component is rendered */
  

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
    
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
        
      })
      setErrorMessage(`${title} by ${author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

  }

  /***check if user details is in localstorage */
  
  /***TODO */
  /*** handler for multiple inputs>>> link below*/
  /**https://www.pluralsight.com/guides/handling-
   * multiple-inputs-with-single-onchange-handler-react */
  // const handleBlogChange = (event) => {
  //   setNewBlog(event.target.value)
  // }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      console.log(user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setIsLoggedIn(true)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input 
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input 
            type="text"
            value={password}
            name="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="create" >login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog} >
      <div>
        title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} 
          />
      </div>
      <div>
        author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}          
          />
      </div>
      <div>
        url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
      </div>
      <div>
        likes:
          <input
            type="number"
            name="likes"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
      </div>
      <button type="submit">submit</button>
    </form>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setIsLoggedIn(!isLoggedIn)
  }


  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />

      {user === null || !isLoggedIn ?
        loginForm() :
        <div>
          <label>{user.name} is logged in</label>
          <button type="submit" onClick={handleLogout}>
            logout
          </button><br/><br/>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map(blog =>
          <DisplayBlog key={blog.id} blog={blog} />
        )}
        </div>
        }
    </div>
  )
}

export default App