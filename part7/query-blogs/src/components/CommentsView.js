const CommentsView = ({ comments }) => {
  console.log('commentsInComments', comments)
  return (
    <ul>
      {comments.map((comment, idx) => (
        <li key={idx}>
          {comment.text}
        </li>
      ))}
    </ul>
  )
}

export default CommentsView
