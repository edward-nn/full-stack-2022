
const CommentsNew = ({ blog }) => {
  const [comment, setComment] = useState('')


  const addComment = async (e) => {
    e.preventDefault()
    dispatch(editBlog(updatedBlog))
    setComment('')
  }
  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button>add comment</button>
        </div>
      </form>
      <ul style={{ padding: 0 }}>
        {blog.comments.map((comment, idx) => {
          return (
            <li key={idx} className="comment">
              {comment}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default CommentsNew