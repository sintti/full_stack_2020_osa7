const listHelper = require('./list_helper')

const biggerList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5f64da9bad57de5479c11029',
    title: 'Campasimpukka',
    author: 'CampaSimpukka',
    url: 'https://www.campasimpukka.fi/',
    likes: 23
  },
  {
    _id: '5f64e0a8c7eddd35271ff94c',
    title: 'MBnet',
    author: 'true',
    url: 'https://www.mbnet.fi',
    likes: 1,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyList = []
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(29)
  })

  describe('favorite blog', () => {
    test('returns a blog title, author and likes', () => {
      const result = listHelper.favoriteBlog(biggerList)
      console.log(result)
      expect(result).toEqual(
        {
          _id: '5f64da9bad57de5479c11029',
          title: 'Campasimpukka',
          author: 'CampaSimpukka',
          url: 'https://www.campasimpukka.fi/',
          likes: 23
        },
      )
    })
  })
})