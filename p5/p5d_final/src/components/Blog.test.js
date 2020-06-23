import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import DisplayBlog from './DisplayBlog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

test('renders title and author', () => {
  const blog = {
    title: 'Dodskie, why are you handsome?',
    author: 'Dodskie Gwapo',
    url: 'dodskiegwapo.com',
    likes: 500000
  }

  const mockHandler = jest.fn()

  const component = render(
    <DisplayBlog blog={blog} handleClick={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Dodskie, why are you handsome?',
    'Dodskie Gwapo',
    'dodskiegwapo.com',
    500000
  )
  // expect(component.container).toHaveTextContent(
  //   'Dodskie Gwapo'
  // )

  component.debug()

})

// test('clicking the button calls even handler once', () => {
//   const blog = {
//     title: 'Dodskie, why are you handsome?',
//     author: 'Dodskie Gwapo',
//     url: 'dodskiegwapo.com',
//     likes: 5000
//   }

//   const mockHandler = jest.fn()

//   const component = render(
//       <Blog blog={blog} to
//   )
// })

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled contents can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const handleAddBlog = jest.fn()

  const component = render(
    <BlogForm handleAddBlog={handleAddBlog} />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing forms could be easier' }
  })
  fireEvent.submit(form)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe(
    'testing forms could be easier')
})

test('click like 2x will call updateBlog 2x', () => {
  /*** not working yet */
  const blog = {
    title: 'Dodskie, why are you handsome?',
    author: 'Dodskie Gwapo',
    url: 'dodskiegwapo.com',
    likes: 500000
  }

  const mockHandler = jest.fn()

  const component = render(
    <DisplayBlog blog={blog} handleClick={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  component.debug()

  const updateBlog = jest.fn()

  const button1 = component.getByText('like')
  fireEvent.click(button1)
  fireEvent.click(button)
  component.debug()

  expect(updateBlog.mock.calls).toHaveLength(2)
})