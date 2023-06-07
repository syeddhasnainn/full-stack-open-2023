import { useState } from "react"


const CreateBlog = ({ createBlog, token }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({title, author,url}, token)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2> create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type='text'
                        name='Title'
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                        placeholder="input-title"
                    />
                </div>

                <div>
                    author:
                    <input
                        type='text'
                        name='Author'
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                        placeholder="input-author"
                    />
                </div>

                <div>
                    url:
                    <input
                        type='text'
                        name='URL'
                        value={url}
                        onChange={({target}) => setUrl(target.value)}
                        placeholder="input-url"
                    />
                </div>
                <button type='submit' name="create">create</button>
            </form>
        </div>
    )
}

export default CreateBlog