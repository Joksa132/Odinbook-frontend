import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from "axios";
import { UserContext } from "../../Context/UserContext"
import { useContext } from "react";
import { Link } from "react-router-dom";

function Comment({ comment, onLikedComment, comments, setComments }) {
  const { user } = useContext(UserContext)

  const likeComment = () => {
    const like = {
      commentId: comment._id
    }
    axios.post("http://localhost:4000/comment/like", like, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => onLikedComment())
  }

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete this comment?")
    confirmation &&
      axios.delete(`http://localhost:4000/comment/delete/${comment._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
          setComments(comments.filter((comment) => comment._id !== res.data._id))
        })
        .catch((err) => console.log(err))
  }

  return (
    <Box
      sx={{
        backgroundColor: "rgb(36,37,38)"
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display={"flex"} sx={{ alignItems: "center", gap: "5px" }}>
          {comment.createdBy.profilePicture ?
            <img src={`http://localhost:4000/profilepicture/${comment.createdBy.profilePicture}`} alt='profile' width={"8%"} style={{ borderRadius: "30px" }} />
            : <img src={`http://localhost:4000/profilepicture/default-avatar.jpg`} alt='profile' width={"8%"} style={{ borderRadius: "30px" }} />
          }
          <Link
            to={"/profile/" + comment.createdBy._id}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="subtitle2" color={"primary"} sx={{ marginTop: "10px" }}>
              {`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
            </Typography>
          </Link>
        </Box>
        {comment.createdBy._id === user.userId &&
          <Button startIcon={<DeleteForeverIcon fontSize="small" />} onClick={handleDelete}>Delete</Button>
        }
      </Box>

      <Typography variant="subtitle1" color="#e0e0e0">
        {new Date(comment.createdAt).toLocaleDateString('en-GB')}
      </Typography>
      <Typography variant="body2" paragraph fontWeight="500">
        {comment.description}
      </Typography>
      <Typography color="primary" fontSize="small">{comment.likes.length} likes</Typography>
      {comment.likes.find(likeData => likeData._id === user.userId) ?
        <Button size="small" startIcon={<ThumbDownIcon />} onClick={likeComment}>Dislike</Button> :
        <Button size="small" startIcon={<ThumbUpIcon />} onClick={likeComment}>Like</Button>}

    </Box>
  )
}

export default Comment