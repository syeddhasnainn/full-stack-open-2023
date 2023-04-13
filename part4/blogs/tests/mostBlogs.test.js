const mostBlogs = require('../utils/list_helper').mostBlogs
const {blogs} = require('../utils/blogs_list')

describe('top author', () => { 
    test('to check which author has the most blogs', () =>{
        const result = mostBlogs(blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
          })
    })
 })
