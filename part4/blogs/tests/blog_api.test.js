const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
  })


test('blog is saved to the database', async () => {

    const newBlog = {
        "title": "this is from tests",
        "author": "hasnain",
        "url": "http://localhost:3003/api/blogs/3",
        "likes": 5
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
})

test('likes property defaults to 0 is missing', async() => {
    const newBlog = {
        "title": "this is from likes test",
        "author": "hasnain",
        "url": "http://localhost:3003/api/blogs/5",
    }
    
    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    expect(response.body.likes).toEqual(0)
})

test('title or url is missing', async() => {
    const newBlog = {
        "title": "this is from likes test",
        "author": "hasnain",
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('a blog has been deleted', async() => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

      const blogsAfterDelete = await helper.blogsInDb()

      expect(blogsAfterDelete).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      const contents = blogsAfterDelete.map(response => response.title)
  
      expect(contents).not.toContain(blogToDelete.title)})

test('a blog is updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 10 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlog.likes).toBe(10)
})

afterAll(async () =>{
    await mongoose.connection.close()
})