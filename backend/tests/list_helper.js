const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumLikes = (total, num) => {
    return total + num
  }
  if (blogs.length === 0) {
    return 0
  } else {
    const likesList = blogs.map(blog => blog.likes)
    return likesList.reduce(sumLikes, 0)
  }
}

const favoriteBlog = (blogs) => {
  const blogWithMostLikes = blogs.reduce((prev, current) =>
    (prev.likes > current.likes) ? prev : current)
  return blogWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

4.1,4.2,3,4,5,8,9,10,11,12,13,14,15,16,17,18,19,20