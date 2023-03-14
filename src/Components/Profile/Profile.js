import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Typography } from '@mui/material';

import Nav from "../Nav/Nav"
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../Post/Post';

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

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          {!loading ?
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
              <Typography variant='h4'>
                {profileInfo[0].firstName + " " + profileInfo[0].lastName}
              </Typography>
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
                      <Post key={post._id} post={post} />
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