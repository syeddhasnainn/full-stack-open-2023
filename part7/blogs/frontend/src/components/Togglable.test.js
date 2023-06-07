import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('test for <Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable buttonLabel="view">
        <div className="testDiv" >
          togglable content
        </div>
      </Toggleable>
    ).container
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})