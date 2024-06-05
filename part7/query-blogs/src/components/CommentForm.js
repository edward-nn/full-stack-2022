import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from 'react-bootstrap'
import blogService from '../services/blogs'

const CommentForm = ({ id }) => {
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlog = (blog) => { updateBlogMutation.mutate({ id, blog })  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const comments = event.target.comment.value
    if(comments.trim()){
      updateBlog(comments)
      event.target.comment.value = ''
    }
  }

  return (
    <form name='commentform' onSubmit={handleSubmit}>
      <input id='comment' type="text" name="comment"/>
      <Button id='creating-button' type='submit'>create comment</Button>
    </form>
  )}

export default CommentForm