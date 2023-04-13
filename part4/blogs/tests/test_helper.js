const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "first blog",
        "author": "hasnain",
        "url": "http://localhost:3003/api/blogs/1",
        "likes": 1
    },
    {
        "title": "second blog",
        "author": "saif",
        "url": "http://localhost:3003/api/blogs/2",
        "likes": 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

const usersInDb = async () => {
const users = await User.find({})
return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}