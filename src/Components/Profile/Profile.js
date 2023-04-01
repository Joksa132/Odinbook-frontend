import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, Container, CssBaseline, IconButton, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import Nav from "../Nav/Nav"
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import { UserContext } from "../../Context/UserContext";

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
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getProfileInfo() {
      try {
        setLoading(true);
        const data = await axios.get(`${process.env.REACT_APP_BackendURL}/user/${id}`)
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
        const data = await axios.get(`${process.env.REACT_APP_BackendURL}/post/${id}`)
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
    axios.get(`${process.env.REACT_APP_BackendURL}/post/${id}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  }

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this post?")
    confirmation &&
      axios.delete(`${process.env.REACT_APP_BackendURL}/post/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
          setPosts(posts.filter((post) => post._id !== res.data._id))
        })
        .catch((err) => console.log(err))
  }

  const onSubmit = (description, image) => {
    if (image) {
      const formData = new FormData()
      formData.append("image", image)
      const newPost = {
        description
      }

      axios.post(`${process.env.REACT_APP_BackendURL}/post/new`, newPost, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then(res => {
          axios.put(`${process.env.REACT_APP_BackendURL}/post/newImage/${res.data._id}`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
            .then(res => {
              setPosts(prevPosts => [res.data, ...prevPosts])
              console.log(res.data)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    } else {
      const newPost = {
        description
      }

      axios.post(`${process.env.REACT_APP_BackendURL}/post/new`, newPost, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => { setPosts(prevPosts => [res.data, ...prevPosts]) })
        .catch((err) => console.log(err))
    }
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
    axios.put(`${process.env.REACT_APP_BackendURL}/post/update/${id}`, updatePost)
      .then(res => {
        setPosts(posts.map(post => (post._id === res.data._id ? res.data : post)))
        setEdit(null)
      })
      .catch(err => console.log(err))
  }

  const handleFollow = () => {
    axios.get(`${process.env.REACT_APP_BackendURL}/user/${id}`)
      .then((res) => setProfileInfo(res.data))
      .catch(err => console.log(err))
  }

  const onFollow = () => {
    const follow = {
      id
    }
    axios.post(`${process.env.REACT_APP_BackendURL}/user/follow`, follow, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => handleFollow())
      .catch(err => console.log(err))
  }

  const handleImage = (e) => {
    const uploadedImage = e.target.files[0];

    const formData = new FormData()
    formData.append("image", uploadedImage)

    axios.put(`${process.env.REACT_APP_BackendURL}/user/profilepicture/${profileInfo._id}`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => handleImageChange())
      .catch(err => console.log(err))
  }

  const handleImageChange = () => {
    axios.get(`${process.env.REACT_APP_BackendURL}/user/${id}`)
      .then(res => setProfileInfo(res.data))
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
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                  {profileInfo.profilePicture ?
                    <img src={profileInfo.profilePicture} alt='profile' width={"10%"} style={{ borderRadius: "30px" }} />
                    : <img src={`${process.env.REACT_APP_BackendURL}/profilepicture/default-avatar.jpg`} alt='profile' width={"10%"} style={{ borderRadius: "30px" }} />
                  }
                  <Typography variant='h4' sx={{ marginBottom: "10px" }}>
                    {profileInfo.firstName + " " + profileInfo.lastName}
                  </Typography>
                </Box>
                {profileInfo._id === user.userId &&
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input type="file" hidden accept="image/*" id="button-upload-image" onChange={handleImage} />
                    <PhotoCamera />
                    <Typography>Change your picture</Typography>
                  </IconButton>

                }
              </Box>

              {profileInfo._id !== user.userId ?
                profileInfo.followedBy.find(follower => follower._id === user.userId) ?
                  <Button variant='contained' onClick={() => { onFollow(); handleFollow() }} startIcon={<PersonRemoveIcon />} sx={{ marginBottom: "10px" }}>Unfollow</Button>
                  : <Button variant='contained' onClick={() => { onFollow(); handleFollow() }} startIcon={<PersonAddIcon />} sx={{ marginBottom: "10px" }}>Follow</Button>

                : <PostForm onSubmit={onSubmit} editValue={edit?.description} id={edit?.postId} onEdit={onEditSubmit} />}

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