const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('../tests/test_helper')
const app = require('../app')
const api = supertest(app)
// const bcrypt = require('bcrypt')

const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const jestConfig = require('../jest.config')


beforeEach(async () => {
  await Blog.deleteMany({})

  /***use if promise order is of importance */
  //   for (let blog of helper.initialBlogs) {
  //     let blogObject = new Blog(blog)
  //     await blogObject.save()
  //   }

  /** use if promise order is not important */
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArr = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArr)

})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is in the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      // .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    console.log(validNonExistingId)

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .expect(404)
  })

  test('fails with statuscode 404 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  jest.setTimeout(30000)

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'The adventures of Dodskie Gwapo',
      author: 'Dodskie Gwapo',
      url: 'https://dodskiegwapo.com',
      likes: 10000000
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdWR6a2llIiwiaWQiOiI1ZWUwZGIwOGVjNjhiOTUyZDdiMmU5MTMiLCJpYXQiOjE1OTE5MzI5MzZ9.xVC5Bq_5fcY88PqonbB2jCnXyUSXXjlfh7fTEOjFolY')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'The adventures of Dodskie Gwapo'
    )
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Dodskie Pangit'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('default likes to 0', async () => {
    const newBlog = {
      title: 'The adventures of Dodskie Pangit',
      author: 'Dodskie Pangi',
      url: 'https://dodskiepangit.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  })
})

describe('deletion of a blog', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(t => t.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

/***failed, need to check and review */
describe('updating of a blog', () => {
  test('successful updating of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    console.log(blogToUpdate.likes)

    const newBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      likes: 100000
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const results = blogsAtEnd.map(r => r.likes)
    expect(results).toContain(100000)
  })
})

describe('when there is initially one user in db', () => {
  /**initialize user collection and adds user root */
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({
      username: 'test',
      name: 'test',
      password: 'secret'
    })

    await user.save()
  })

  test('creation of new username is successful', async () => {
    const usersAtStart = await helper.usersInDb()

    console.log(usersAtStart)

    const newUser = {
      username: 'daudzkie',
      name: 'Dodskie Gwapo',
      password: 'bakakon'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    console.log(usersAtEnd)
    console.log(usersAtEnd.length)

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code if user already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'Dodskie Pangit',
      password: 'tinuod',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})




afterAll(() => {
  mongoose.connection.close()
})