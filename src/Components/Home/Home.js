import { Button, Container, CssBaseline, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import axios from "axios";

import Nav from "../Nav/Nav"
import Post from '../Post/Post';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function Home() {
  const { user } = useContext(UserContext)
  const [description, setDescription] = useState('')
  const [posts, setPosts] = useState([])

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newPost = {
      description
    }
    axios.post("http://localhost:4000/post/new", newPost, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios.get("http://localhost:4000/post/all")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  }, [posts])

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "20px"
          }}
        >
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
            onSubmit={onSubmit}
          >
            <TextField
              multiline
              rows="5"
              placeholder={`What's on your mind, ${user}?`}
              id="description"
              label="Post"
              name="description"
              autoFocus
              onChange={onChangeDescription}
              sx={{ width: "400px" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, mb: 1, width: "100px" }}
            >
              Submit
            </Button>
          </Box>
        </Container>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "20px"
          }}
        >
          {posts.map(post => {
            return (
              <Post key={post._id} post={post} />
            )
          })}
        </Container>

      </ThemeProvider>
    </>
  )
}

export default Home