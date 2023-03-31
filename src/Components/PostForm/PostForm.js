import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';

import { UserContext } from "../../Context/UserContext"
import { useContext, useEffect, useState } from "react";

function PostForm({ onSubmit, editValue, onEdit, id }) {
  const { user } = useContext(UserContext)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    setDescription(editValue)
  }, [editValue])

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editValue) {
      onEdit(description, id)
      setDescription('')
    } else {
      onSubmit(description, image)
      setDescription('')
      setImage(null)
    }
  }

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "rgb(36,37,38)",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "450px"
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        multiline
        rows="5"
        placeholder={`What's on your mind, ${user.username}?`}
        id="description"
        label="Post"
        name="description"
        autoFocus
        onChange={onChangeDescription}
        sx={{ width: "400px" }}
        value={description}
      />
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input type="file" hidden accept="image/*" id="button-upload-image" onChange={handleImage} />
        <PhotoCamera />
      </IconButton>
      {image &&
        <Typography>{image.name}</Typography>
      }
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 1, mb: 1, width: "100px" }}
        startIcon={<ArrowForwardIosIcon />}
      >
        Submit
      </Button>
    </Box>
  )

}

export default PostForm