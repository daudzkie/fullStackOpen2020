const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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

  if (!body.title || !body.url) {
    return response.status(400).json({
      message: 'missing content' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
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