const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let favorite = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const blogsByAuthor = blogs.reduce((result, blog) => {
    result[blog.author] = (result[blog.author] || 0) + 1
    //console.log('result', result)
    return result
  }, {})
  //console.log('blogsByAuthor', blogsByAuthor)
  const [topAuthor, topAuthorBlogs] = Object.entries(blogsByAuthor).reduce(
    (max, [author, blogs]) => (blogs > max[1] ? [author, blogs] : max),    ['', 0]

  )

  return { author: topAuthor, blogs: topAuthorBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  let authorLikes = blogs.reduce((op, { author, likes }) => {
    op[author] = op[author] || 0
    op[author] += likes
    return op
  },{})

 // console.log(authorLikes)

  const [topAuthor, topAuthorLikes] = Object.entries(authorLikes).reduce(
    (max, [author, likes]) => (likes > max[1] ? [author, likes] : max),    ['', 0]

  )

  return { author: topAuthor, likes: topAuthorLikes }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
