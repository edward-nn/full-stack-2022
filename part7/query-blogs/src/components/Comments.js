//import blogService from '../services/blogs'

const Comments = ({ comments }) => {
  console.log('commentsInComments', comments)
  return (
    <ul>
      {comments.map((comment, idx) => (
        <li key={idx}>
          {comment}
        </li>
      ))}
    </ul>
  )
}

export default Comments