import axios from "axios";
const baseUrl = 'http://localhost:3003/api/blogs'
const loginUrl = 'http://localhost:3003/api/login'
export const getBlogs = () => axios.get(baseUrl).then(res=>res.data)

export const createBlogs = (newBlog) => {

    const headers = {
        'Authorization': `Bearer ${newBlog.user}`,
    }
    return axios.post(baseUrl, newBlog.blog, {headers})
        .then(res=>res.data)
}

export const deleteBlogs = (blogObject) => {
    return axios.delete(`${baseUrl}/${blogObject.id}`).then(res=>res.data)
}

export const updateBlog = updatedBlog => axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog).then(res=>res.data)

export const loginBlog = credentials => {
    console.log(credentials)
    return axios.post(loginUrl, credentials).then(res=>res.data)
}
