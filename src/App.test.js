import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: key => savedItems[key],
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    // expectations
    expect(component.container).not.toHaveTextContent('New note')
    expect(component.container.querySelector('.blogInfo')).toBeNull()

  })

  test('if user is logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('logout'))

    // expectations
    expect(component.container.querySelector('.blogInfo')).toBeDefined()

  })

})
