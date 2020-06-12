const totalLikes = (blogs) => {
  const likesArr = blogs.map(blogs => blogs.likes)
  let sum = likesArr.reduce(function(a, b){
    return a + b
  }, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  let favBlog = blogs.reduce((prev, curr) =>
    (+prev.likes > curr.likes) ? prev : curr)

  console.log(favBlog)
  return favBlog
}

// const mostBlogs = (blogs) => {
//   let authMostBlogs = blogs.reduce((prev, curr) =>
//     (+prev.))
// }


module.exports = {
  totalLikes,
  favoriteBlog
}