import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import CreateBlog from "./CreateBlog";
import userEvent from "@testing-library/user-event";

test("<CreateBlog /> event is called with right details", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog createBlog={createBlog}/>)

  const title = screen.getByPlaceholderText('input-title')
  const author  = screen.getByPlaceholderText('input-author')
  const url = screen.getByPlaceholderText('input-url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'this is title')
  await user.type(author, 'this is author')
  await user.type(url, 'this is url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is title')
  expect(createBlog.mock.calls[0][0].author).toBe('this is author')
  expect(createBlog.mock.calls[0][0].url).toBe('this is url')
});