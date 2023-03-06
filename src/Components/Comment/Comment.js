import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Comment({ comment }) {
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
      <Typography color="primary" fontSize="small">5 likes</Typography>
      <Button size="small" startIcon={<ThumbUpIcon />}>Like</Button>
    </Box>
  )
}

export default Comment