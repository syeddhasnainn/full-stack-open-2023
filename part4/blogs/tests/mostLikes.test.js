const {blogs} = require('../utils/blogs_list')
const favoriteBlog = require('../utils/list_helper').favoriteBlog

const mostLikes = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }

describe('most likes', () => {
    test('to check which blog has the most likes', () => {
      const result = favoriteBlog(blogs)
      expect(result).toEqual(mostLikes)
    })
})
