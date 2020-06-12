const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

/*** Needed if adding blog with user ***/
/*** isolates token from authorization*/
/***this works */
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization, 'authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log(authorization.split(' ')[1])
    return authorization.split(' ')[1]
    // return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById({ _id: request.params.id })
  if (blog) {
    response.status(200).json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  // const token = await tokenExtractor({ request })

  /*** Below is needed for adding blog with user ***/
  const token = getTokenFrom(request)/***this works */
  console.log(token, 'token router')

  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken, 'decodedtoken')

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token invalid or missing ' })
  }

  const user = await User.findById(decodedToken.id)
  console.log(user)

  if (!body.title || !body.url) {
    return response.status(400).json({
      message: 'missing content' })
  }

  /***Useful to get loggedin user ***/
  // const user = await User.findOne()
  // console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  /**add blogs id to user.blogs collection */
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  // const blog = await Blog.findByIdAndDelete({ _id: request.params.id })
  // response.status(204).json(blog)

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(decodedToken)

  if (!decodedToken) {
    return response.status(401).json()
  }

  const blog = await Blog.findByIdAndDelete({ _id: request.params.id })
  response.status(204).json(blog)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const blogToUpdate = await Blog.findByIdAndUpdate({ _id: request.params.id }, blog, { new: true })
  response.status(200).send(blogToUpdate)

})

module.exports = blogRouter