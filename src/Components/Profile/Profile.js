import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Typography } from '@mui/material';

import Nav from "../Nav/Nav"
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Profile() {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState({})
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true)
  const [edit, setEdit] = useState(null)

  useEffect(() => {
    async function getProfileInfo() {
      try {
        setLoading(true);
        const data = await axios.get(`http://localhost:4000/user/${id}`)
        setProfileInfo(data.data)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false);
      }
    }

    getProfileInfo()
  }, [id])

  useEffect(() => {
    async function getProfilePosts() {
      try {
        setPostsLoading(true)
        const data = await axios.get(`http://localhost:4000/post/${id}`)
        setPosts(data.data)
      } catch (e) {
        console.log(e)
      } finally {
        setPostsLoading(false)
      }
    }

    getProfilePosts()
  }, [id])

  const handleLikePost = () => {
    axios.get(`http://localhost:4000/post/${id}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  }

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this post?")
    confirmation &&
      axios.delete(`http://localhost:4000/post/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
          setPosts(posts.filter((post) => post._id !== res.data._id))
        })
        .catch((err) => console.log(err))
  }

  const onSubmit = (description) => {
    const newPost = {
      description
    }
    axios.post("http://localhost:4000/post/new", newPost, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => { setPosts(prevPosts => [res.data, ...prevPosts]) })
      .catch((err) => console.log(err))
  }

  const handleEdit = (description, postId) => {
    setEdit({
      description,
      postId
    })
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const onEditSubmit = (description, id) => {
    const updatePost = {
      description
    }
    axios.put(`http://localhost:4000/post/update/${id}`, updatePost)
      .then(res => {
        setPosts(posts.map(post => (post._id === res.data._id ? res.data : post)))
        setEdit(null)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          {!loading ?
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px"
              }}
            >
              <Typography variant='h4' sx={{ marginBottom: "10px" }}>
                {profileInfo[0].firstName + " " + profileInfo[0].lastName}
              </Typography>
              <PostForm onSubmit={onSubmit} editValue={edit?.description} id={edit?.postId} onEdit={onEditSubmit} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: "20px"
                }}
              >
                {!postsLoading ?
                  posts.map(post => {
                    return (
                      <Post
                        key={post._id}
                        post={post}
                        onLikedPost={handleLikePost}
                        handleDelete={() => handleDelete(post._id)}
                        handleEdit={() => handleEdit(post.description, post._id)}
                      />
                    )
                  }) : <Box>Loading</Box>}
              </Box>
            </Box>
            : <Box>Loading</Box>}
        </Container>
      </ThemeProvider>

    </>
  )
}

export default Profile