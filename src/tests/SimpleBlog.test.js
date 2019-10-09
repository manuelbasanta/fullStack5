import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'


describe('<SimpleBlog />', () => {

  const blog = {
    'likes': 10,
    'title': 'Testing react apps',
    'author': 'Manuel',
  }

  const mockHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )
  })

  test('renders the title, author and amount of likes', () => {
    const title = component.container.querySelector('.title')
    const likes = component.container.querySelector('.likes')

    expect(title).toHaveTextContent(
      'Testing react apps Manuel'
    )

    expect(likes).toHaveTextContent(
      'blog has 10 likes'
    )
  })

  test('if the like button is pressed twice, the event handler is called twice', () => {

    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

})
