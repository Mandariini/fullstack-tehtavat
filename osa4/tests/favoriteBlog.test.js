const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a488888888888888f8',
      title: 'forsenPls',
      author: 'Jack Martin',
      url: 'http://www.test.com',
      likes: 9,
      __v: 0
    }
  ]

  test('two blogs', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual({
      title: 'forsenPls',
      author: 'Jack Martin',
      likes: 9})
  })

  test('empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(0)
  })
})