import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';

import { UserContext } from "../../Context/UserContext"
import { useContext, useEffect, useState } from "react";

function PostForm({ onSubmit, editValue, onEdit, id }) {
  const { user } = useContext(UserContext)
  const [description, setDescription] = useState('')

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
      onSubmit(description)
      setDescription('')
    }
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
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, mb: 1, width: "100px" }}
      >
        Submit
      </Button>
    </Box>
  )

}

export default PostForm