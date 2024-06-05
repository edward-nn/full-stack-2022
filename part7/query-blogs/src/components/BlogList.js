import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={1}></th>
          <th colSpan={2}>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(blogs).map((key) => {
          const blog = blogs[key]
          console.log('blogList', blog)
          console.log('blogList.id', blog._id)
          return (
            <tr key={blog.id}>
              <td>
                <h3>{blog.title}</h3>
                <Link to={`/users/${blog._id}`}>{blog.name}</Link>
              </td>
              <td>{blog.blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default BlogList
