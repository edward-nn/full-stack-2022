import {
  useNavigate, useMatch
} from "react-router-dom"
import { Button } from 'react-bootstrap'
import {useMutation, useQueryClient } from '@tanstack/react-query'
import { useCounterValue } from '../components/NotificationContext'
import blogService from '../services/blogs'
import Comments from './Comments'
import CommentForm from './CommentForm'


const Blog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate('/')
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const counter = useCounterValue()
  const blogs  = counter ? counter.data : []
  const user = counter ? counter.user : []
  const match = useMatch('/blogs/:id')
  if (!blogs) {    return null  }
  
  const  blog = match
  ? blogs.find(blog => blog.id === match.params.id)
  : null
  const comments = (blog?.comments ?? []).map(r => r.text);

if (!blog) {
  return null
}
const deleteBlog =(id) =>{  
   deleteBlogMutation.mutateAsync( id );  
}

const showRemoveButton = (blog) => {
  if(window.confirm(`remove ${blog.title} by ${blog.author}`)) {
    deleteBlog(blog.id)
  }
}

const updateBlog = (blog) => { updateBlogMutation.mutate({...blog, likes: blog.likes+1 })  }

return (
  <div >
    <h3>{blog.title}&nbsp;{blog.author }</h3>

    <br/>
    <div>
    <a href={blog.url} className="url">
        {blog.url}
      </a>
      <a href={blog.url }>{blog.url }</a> <br/>
      <span className='blogLikes'>  likes: {blog.likes}{' '}<Button onClick={() => updateBlog(blog)}>like</Button><br /></span>
      <br/>
      
      {(blog.user && user && user.username===blog.user.username)&&
          <Button onClick={() => { {showRemoveButton(blog) }}}>
            remove
          </Button>
        } 
  <div>
  <br/>
  added by {blog.user.name} 
        <br/> 
  </div>  
  <br/> 
  <div><CommentForm id={blog.id}/></div>
  <div>             
         {blog.comments && <Comments comments={comments} />}
      </div>
  </div>
  </div>
)
}

export default Blog