import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Toggleable from "./components/Toggleable";
import CreateBlog from "./components/CreateBlog";
import { useNotificationDispatch } from "./NotificationContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createBlogs,
  deleteBlogs,
  getBlogs,
  loginBlog,
  updateBlog,
} from "./requests";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useUser } from "./UserContext";

const App = () => {
  const [state, userDispatch] = useUser()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBloguser");
  
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      
      userDispatch({type: 'LOGIN', payload: user.token});
    }
  }, []);

  const queryClient = useQueryClient();

  const noteFormRef = useRef();
  

  const updateBlogMutation = useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const createBlogMutation = useMutation(createBlogs, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const deleteBlogMutation = useMutation(deleteBlogs, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const loginBlogMutation = useMutation(loginBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries("login");
    },
  });

  const dispatch = useNotificationDispatch();

  const result = useQuery("blogs", getBlogs, { retry: true });
  const blogs = result.data;
  
  
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const handleLogin = async (event) => {
    
    event.preventDefault();
    try {
      const user = await loginBlogMutation.mutateAsync({ username: state.username, password:state.password });
      window.localStorage.setItem("loggedBloguser", JSON.stringify(user));
      blogService.setToken(user.token);

      userDispatch({ type: "LOGIN", payload: user });

      
    } catch (exception) {
      dispatch({ type: "SHOW", payload: "wrong username or password" })
      setTimeout(() => {
        dispatch({ type: "HIDE" })
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    
    event.preventDefault();
    window.localStorage.clear();
    userDispatch({ type: "LOGOUT", payload: null });
  };

  const updateLikes = async (blog) => {
    try {
      updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
      dispatch({ type: "SHOW", payload: "liked blog" });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 3000);
    } catch (exception) {
      dispatch({ type: "SHOW", payload: "error updating blog" });
    }
  };

  const deleteBlog = async (id) => {
    try {
      deleteBlogMutation.mutate({ id });
      const updatedBlog = blogs.filter((blog) => blog.id !== id);
      dispatch({ type: "SHOW", payload: "Blog Removed" });
    } catch (exception) {
      dispatch({ type: "SHOW", payload: "error deleting blog" });
    }
  };

  const addBlog = async (blog, user) => {
    createBlogMutation.mutate({ blog, user });
    dispatch({ type: "SHOW", payload: "a new blog created" });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 3000);
  };

  if (state.loggedInUser === null) {
    return (
      <div>
        <Notification />
        
        <Toggleable buttonLabel="Login">
          <LoginForm
            username={state.username}
            password={state.password}
            setUsername={({ target }) => userDispatch({ type: "SET_USERNAME", payload: target.value })}
            setPassword={({ target }) => userDispatch({ type: "SET_PASSWORD", payload: target.value })}
            handleLogin={handleLogin}
          />
        </Toggleable>
      </div>
    );
  }

  return (
    
      <div>
        <Link to="/users">users</Link>
        
        <Notification />
        <h1>blog app</h1>

        <div>
          {`logged in as ${state.username}`}
          <button onClick={handleLogout}>logout</button>
        </div>
        <Toggleable buttonLabel="new note" ref={noteFormRef}>
          <CreateBlog createBlog={addBlog} token={state.loggedInUser} />
        </Toggleable>
        <br></br>

        <h2>blogs</h2>

        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              user={state.loggedInUser}
            />
          ))}
      </div>
    
  );
};

export default App;
