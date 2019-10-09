import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


describe('<Blog />', () => {

  const blog = {
    'likes': 10,
    'title': 'Testing react apps',
    'author': 'Manuel',
    'url': 'http://url.com',
    'user': {
      'username': 'manuel',
      'name': 'manuel',
    }
  }

  const user = {
    'username': 'manuel',
    'name': 'manuel'
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user}/>
    )
  })

  test('name and author of the blog post are shown by default', () => {

    expect(component.container).toHaveTextContent(
      'Testing react apps Manuel'
    )

    expect(component.container).not.toHaveTextContent(
      'added by'
    )
  })

  test('when the blog is clicked, blog information becomes visible', () => {

    const button = component.container.querySelector('.blogInfo')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'added by manuel'
    )
  })

})
