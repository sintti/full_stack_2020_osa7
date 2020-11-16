import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Testiblogi',
      author: 'Sintti Pinttinen',
      url: 'www.testiblogi.fi',
      likes: 1
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders author and title', () => {
    expect(component.container).toHaveTextContent(
      'Testiblogi'
    )
    expect(component.container).toHaveTextContent(
      'Sintti Pinttinen'
    )
  })

  test('url and likes are hidden', () => {
    const hiddenDiv = component.container.querySelector('.hiddenStuff')

    expect(hiddenDiv).toHaveStyle('display: none')
  })
})

describe('like button', () => {
  test('clicking like button twice calls event handler twice', () => {

    const blog = {
      title: 'Testiblogi',
      author: 'Sintti Pinttinen',
      url: 'www.testiblogi.fi',
      likes: 1
    }

    const mockLikes = jest.fn()

    const testComponent = render(
      <Blog blog={blog} likeBlog={mockLikes} />
    )

    const likeButton = testComponent.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikes.mock.calls).toHaveLength(2)
  })


})

