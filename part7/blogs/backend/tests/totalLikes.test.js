const totalLikes = require('../utils/list_helper').totalLikes
const {listWithOneBlog, blogs, emptyBlogs} = require('../utils/blogs_list')



describe('total likes', () => {
      test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
      })

      test('of a bigger list is calculated right', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
      })

      test('of empty list is zero', () => {
        const result = totalLikes(emptyBlogs)
        expect(result).toBe(0)
      })
  })