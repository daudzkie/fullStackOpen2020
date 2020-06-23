import React, { useState, useEffect } from 'react'
import DisplayBlog from './components/DisplayBlog'
import blogService from './services/blogService'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  // const [likes, setLikes] = useState('')
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [showDetails, setShowDetails] = useState(false)
  // const [likesCounter, setLikesCounter] = useState(0)
  const [blogid, setBlogid] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [/*blogs*/])/**[blogs] parameter executes every change in blogs */

  /***check if user details is in localstorage */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])/**[] parameter executes hook the first component is rendered */

  // blogid is blog.id from DisplayBlog
  const updateBlog = (blogid) => {
    console.log(blogid)
    setBlogid({ blogid: blogid })

    const blog = blogs.find(b => b.id === blogid)
    // console.log(blogs)
    console.log(blog)
    const blogObjectToUpdate = {
      ...blog,
      likes: blog.likes + 1
    }

    blogService
      .update(blogid, blogObjectToUpdate)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blogs.id !== blogid ? blog : returnedBlog))
      })

  }

  //Delete Blog
  const handleRemoveBlog = (blogid) => {
    // function to remove/delete a blog
    setBlogid({ blogid: blogid })

    const blog = blogs.find(b => b.id === blogid)

    if (window.confirm('Remove ' + blog.title + ' by ' + blog.author))
      blogService
        .remove(blogid)
        .then(returnedBlog => {
          setBlogs(blogs.map(blog => blogs.id !== blogid ? blog : returnedBlog))
        })

    setErrorMessage(`${blog.title} by ${blog.author} is deleted`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  const handleAddBlog = (blogObject) => {
    /**need to comment out below for cypress to work */
    // blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        // setShowDetails(false)
        // setTitle('')
        // setAuthor('')
        // setUrl('')
        // setLikes('')
      })
      /**move below to notification or message handler */
      // setErrorMessage(`${title} by ${author} is added`)
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)

  }

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
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable id="btn-newblog" buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm
        // title={title}
        // author={author}
        // url={url}
        // likes={likes}
        // handleTitleChange={({ target }) => setTitle(target.value)}
        // handleAuthorChange={({ target }) => setAuthor(target.value)}
        // handleUrlChange={({ target }) => setUrl(target.value)}
        // handleLikesChange={({ target }) => setLikes(target.value)}
        handleAddBlog={handleAddBlog}
      />
    </Togglable>
  )

  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input
  //           type="text"
  //           value={username}
  //           name="Username"
  //           placeholder="username"
  //           onChange={({ target }) => setUsername(target.value)}
  //         />
  //     </div>
  //     <div>
  //       password
  //         <input
  //           type="text"
  //           value={password}
  //           name="password"
  //           placeholder="password"
  //           onChange={({ target }) => setPassword(target.value)}
  //         />
  //     </div>
  //     <button type="create" >login</button>
  //   </form>


  //   <form onSubmit={handleAddBlog} >
  //     <div>
  //       title:
  //         <input
  //           type="text"
  //           name="title"
  //           value={title}
  //           onChange={({ target }) => setTitle(target.value)}
  //         />
  //     </div>
  //     <div>
  //       author:
  //         <input
  //           type="text"
  //           name="author"
  //           value={author}
  //           onChange={({ target }) => setAuthor(target.value)}S
  //         />
  //     </div>
  //     <div>
  //       url:
  //         <input
  //           type="text"
  //           name="url"
  //           value={url}
  //           onChange={({ target }) => setUrl(target.value)}
  //         />
  //     </div>
  //     <div>
  //       likes:
  //         <input
  //           type="number"
  //           name="likes"
  //           value={likes}
  //           onChange={({ target }) => setLikes(target.value)}
  //         />
  //     </div>
  //     <button type="submit">submit</button>
  //   </form>
  // )

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
            <DisplayBlog
              key={blog.id}
              blog={blog}
              handleRemoveBlog={handleRemoveBlog}
              updateBlog={updateBlog}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App