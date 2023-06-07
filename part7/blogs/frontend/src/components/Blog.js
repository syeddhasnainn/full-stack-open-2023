import Toggleable from './Toggleable'
import { useRef } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogRef = useRef()

  const handleLikeUpdate = async () => {
    updateLikes(blog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='toggle'>
        <span className='title'>{blog.title}</span>
        <span className='author'>{blog.author} </span>
        <Toggleable buttonLabel='view' ref={blogRef}>
          {blog.url} <br />
          {blog.likes} <button id="like-button" type="submit" onClick={handleLikeUpdate}>like</button><br />
        </Toggleable>
      </div>
      {user.username === blog.author ? <button onClick={handleDelete}>remove</button> : null}
    </div>
  )
}
export default Blog