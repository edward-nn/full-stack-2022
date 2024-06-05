
const CommentsMap = ({ comments }) => {

  comments.map((comment, idx) => {
    return (<div>
      <h5>comments</h5>
      <li key={idx} className="comment">{comment.text}
      </li>
    </div>

    )
  })
}

export default CommentsMap