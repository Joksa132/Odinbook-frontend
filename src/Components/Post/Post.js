import { Button, Typography, Divider, TextField } from "@mui/material"
import { Box } from "@mui/system"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Comment from "../Comment/Comment";
import { UserContext } from "../../Context/UserContext"

function Post({ post, onLikedPost }) {
  const [commentsShown, setCommentsShown] = useState(false)
  const [description, setDescription] = useState('')
  const [comments, setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)
  const { user } = useContext(UserContext)

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      description,
      id: post._id
    }
    axios.post("http://localhost:4000/comment/new", newComment, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setComments(prevComments => [...prevComments, res.data]))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    async function getComments() {
      try {
        setCommentsLoading(true)
        const data = await axios.get(`http://localhost:4000/comment/${post._id}`)
        setComments(data.data)
      } catch (e) {
        console.log(e)
      } finally {
        setCommentsLoading(false);
      }
    }
    getComments()
  }, [post._id])

  const showComments = () => {
    setCommentsShown(!commentsShown)
  }

  const likePost = () => {
    const like = {
      postId: post._id
    }
    axios.post("http://localhost:4000/post/like", like, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => onLikedPost())
  }

  function handleLikeComment() {
    axios.get(`http://localhost:4000/comment/${post._id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgb(36,37,38)",
        width: "60%",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "8px"
      }}>
      <Box>
        <Typography
          variant="h6"
        >
          {`${post.createdBy.firstName} ${post.createdBy.lastName}`}
        </Typography>
        <Typography
          variant="subtitle1"
          color="#e0e0e0"
        >
          {new Date(post.createdAt).toLocaleDateString('en-GB')}
        </Typography>
        <Typography
          variant="body2"
          paragraph
          fontWeight="500"
        >
          {post.description}
        </Typography>
        <Divider />
        <Typography color="primary">{post.likes.length} likes</Typography>
        <Divider />
        <Box sx={{ dispay: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button startIcon={<ThumbUpIcon />} onClick={likePost}>{post.likes.find(likeData => likeData._id === user.userId) ? "Dislike" : "Like"}</Button>
          <Button startIcon={<ChatBubbleIcon />} onClick={showComments}>Comment</Button>
        </Box>
        {commentsShown && (
          <>
            <Divider />
            <Box>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onSubmit={onSubmit}
              >
                <TextField
                  placeholder="Send a comment to this post"
                  autoFocus
                  id="description"
                  label="Comment"
                  name="description"
                  onChange={onChangeDescription}
                  fullWidth
                  autoComplete="off"
                  sx={{ mt: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 1, mb: 1, width: "100px" }}
                >
                  Submit
                </Button>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {!commentsLoading ?
                  comments.map(comment => {
                    return (
                      <>
                        <Comment key={comment._id} comment={comment} onLikedComment={handleLikeComment} />
                        <Divider />
                      </>
                    )
                  }) : "Loading"}
              </Box>

            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default Post