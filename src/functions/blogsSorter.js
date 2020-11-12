export const blogsSorter = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}
