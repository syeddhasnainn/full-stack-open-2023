const lodash = require("lodash");

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => blog.likes + sum, 0)
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce((previous, current) => {
        return previous.likes > current.likes ? previous : current
    })

    return {
        title : mostLikes.title,
        author : mostLikes.author,
        likes : mostLikes.likes
    }
    }

const mostBlogs = (blogs) => {

    const blogsCount = lodash.countBy(blogs, "author")

    authorWithMostBlogs = Object.keys(blogsCount).reduce((first, current) => {
        return blogsCount[first] > blogsCount[current] ? first : current
    })

    return {
        author: authorWithMostBlogs,
        blogs: blogsCount[authorWithMostBlogs]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}