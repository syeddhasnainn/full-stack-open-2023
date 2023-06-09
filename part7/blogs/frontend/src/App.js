import {useEffect, useRef, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import CreateBlog from './components/CreateBlog'
import {useNotificationDispatch} from './NotificationContext'
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {createBlogs, deleteBlogs, getBlogs, loginBlog, updateBlog} from './requests'

const App = () => {

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem('loggedBloguser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            setUser(user)
        }
    }, [])

    const queryClient = useQueryClient()

    const noteFormRef = useRef()

    const updateBlogMutation = useMutation(updateBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        }
    })

    const createBlogMutation = useMutation(createBlogs, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        }
    })

    const deleteBlogMutation = useMutation(deleteBlogs, {
        onSuccess: () => {
            queryClient.invalidateQueries('blogs')
        }
    })

    const loginBlogMutation = useMutation(loginBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('login')
        }
    })

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useNotificationDispatch()

    const result = useQuery('blogs', getBlogs, {retry: true})
    const blogs = result.data


    if (result.isLoading) {
        return <div>loading data...</div>
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginBlogMutation.mutateAsync({username,password});
            console.log(user)
            window.localStorage.setItem(
                'loggedBloguser', JSON.stringify(user)
            )
            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {

            dispatch({type: 'SHOW', payload: 'wrong username or password'})
            setTimeout(() => {
                dispatch({type: 'HIDE'})
            }, 3000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.clear()
        setUser(null)
    }

    const updateLikes = async (blog) => {
        try {
            updateBlogMutation.mutate({...blog, likes: blog.likes + 1})
            dispatch({type: 'SHOW', payload: 'liked blog'})
            setTimeout(() => {
                dispatch({type: 'HIDE'})
            }, 3000);
        } catch (exception) {
            dispatch({type: 'SHOW', payload: 'error updating blog'})
        }
    }

    const deleteBlog = async (id) => {
        try {
            await deleteBlogMutation.mutate({id})
            const updatedBlog = blogs.filter(blog => blog.id !== id)
            dispatch({type: 'SHOW', payload: 'Blog Removed'})
        } catch (exception) {
            dispatch({type: 'SHOW', payload: 'error deleting blog'})
        }
    }

    const addBlog = async (blog, user) => {
        createBlogMutation.mutate({blog, user})
        dispatch({type: 'SHOW', payload: 'a new blog created'})
        setTimeout(() => {
            dispatch({type: 'HIDE'})
        }, 3000)
    }

    if (user === null) {
        return (
            <div>
                <Notification/>
                <h2>Log in to application</h2>
                <Toggleable buttonLabel='login'>
                    <LoginForm
                        username={username}
                        password={password}
                        setUsername={({target}) => setUsername(target.value)}
                        setPassword={({target}) => setPassword(target.value)}
                        handleLogin={handleLogin}
                    />
                </Toggleable>
            </div>
        )
    }

    return (
        <div>
            <Notification/>
            <h1>blog app</h1>

            <div>
                {`logged in as ${user.username}`}
                <button onClick={handleLogout}>logout</button>
            </div>
            <Toggleable buttonLabel='new note' ref={noteFormRef}>
                <CreateBlog createBlog={addBlog} token={user.token}/>
            </Toggleable>
            <br></br>

            <h2>blogs</h2>

            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
            )}

        </div>
    )
}

export default App