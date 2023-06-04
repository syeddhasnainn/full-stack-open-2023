import axios from "axios";
const baseUrl = 'http://localhost:3003/api/blogs'

export const getBlogs = () => axios.get(baseUrl).then(res=>res.data)

export const createBlogs = (newBlog) => axios.post(baseUrl, newBlog).then(res=>res.data)