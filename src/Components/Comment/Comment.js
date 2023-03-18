import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import axios from "axios";
import { UserContext } from "../../Context/UserContext"
import { useContext } from "react";

function Comment({ comment, onLikedComment }) {
  const { user } = useContext(UserContext)

  const likeComment = () => {
    const like = {
      commentId: comment._id
    }
    axios.post("http://localhost:4000/comment/like", like, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => onLikedComment())
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgb(36,37,38)",
        my: "5px"
      }}
    >
      <Typography variant="subtitle2">
        {`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
      </Typography>
      <Typography variant="subtitle1" color="#e0e0e0">
        {new Date(comment.createdAt).toLocaleDateString('en-GB')}
      </Typography>
      <Typography variant="body2" paragraph fontWeight="500">
        {comment.description}
      </Typography>
      <Typography color="primary" fontSize="small">{comment.likes.length} likes</Typography>
      <Button size="small" startIcon={<ThumbUpIcon />} onClick={likeComment}>{comment.likes.find(likeData => likeData._id === user.userId) ? "Dislike" : "Like"}</Button>
    </Box>
  )
}

export default Comment