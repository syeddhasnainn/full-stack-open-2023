import axios from "axios";
const baseUrl = 'http://localhost:3003/api/blogs'

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
