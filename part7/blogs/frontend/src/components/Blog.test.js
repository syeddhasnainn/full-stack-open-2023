import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders the blogs title and author, but does not render its URL or number of likes by default', () => {
    const blog = {
        title: "Blog for component test",
        author: 'test',
        url: 'test.com',
        likes: 10,
        user: '9205',
    }

    const user = {
        'username': 'test',
    }

    const { container } = render(<Blog blog={blog} user={user}/>)

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const toggle = container.querySelector('.togglableContent')

    expect(title).toHaveTextContent('Blog for component test')
    expect(author).toHaveTextContent('test')
    expect(toggle).toHaveStyle('display: none')
})

test('event handler is called twice', async() => {

    const blog = {
        title: "Blog for component test",
        author: 'test',
        url: 'test.com',
        likes: 10,
        user: '9205',
    }

    const user = {
        'username': 'test',
    }

    const mockHandler = jest.fn()
    render(<Blog blog={blog} user={user} updateLikes={mockHandler}/>)

    const users = userEvent.setup()
    const button = screen.getByText('like')
    await users.click(button)
    await users.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

})
