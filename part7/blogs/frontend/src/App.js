import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'
import { useNotificationDispatch } from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createBlogs, getBlogs } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const noteFormRef = useRef()
  const newBlogMutation = useMutation(createBlogs, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useNotificationDispatch()

  const result = useQuery('blogs', getBlogs, {retry:false})
  const blogs = result.data
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBloguser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBloguser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {

      dispatch({ type: 'SHOW', payload: 'wrong username or password' })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate)
      const newBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
      setBlogs(newBlogs)
      dispatch({ type: 'SHOW', payload: 'liked blog' })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000);
    } catch (exception) {
      dispatch({ type: 'SHOW', payload: 'error updating blog' })
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlog = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlog)
      dispatch({ type: 'SHOW', payload: 'Blog Removed' })
    }

    catch (exception) {
      dispatch({ type: 'SHOW', payload: 'error deleting blog' })
    }
  }

  const addBlog = async (event) => {
    const newBlog = await blogService.create(blogObject)
    setBlogs([...blogs, newBlog])
    noteFormRef.current.toggleVisibility()

    dispatch({ type: 'SHOW', payload: 'a new blog created' })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 3000)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            setUsername={({ target }) => setUsername(target.value)}
            setPassword={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      {/* <Notification/>
      <h1>blog app</h1>

      <div>
        {`logged in as ${user.username}`}
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <CreateBlog createBlog={addBlog} />
      </Togglable>
      <br></br>

      // <h2>blogs</h2> */}

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user} />
      )}

    </div>
  )
}

export default App