import { Button, Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useEffect, useState } from "react"
import axios from "axios";

import Nav from "../../Components/Nav/Nav"
import Post from '../../Components/Post/Post';
import PostForm from '../../Components/PostForm/PostForm';
import { Link } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function Home() {
  const [posts, setPosts] = useState([])
  const [edit, setEdit] = useState(null)

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
            .then(res => setPosts(prevPosts => [res.data, ...prevPosts]))
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

  function handleLikePost() {
    axios.get(`${process.env.REACT_APP_BackendURL}/post/follows/all`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BackendURL}/post/follows/all`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  }, [])

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

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this post?")
    confirmation &&
      axios.delete(`${process.env.REACT_APP_BackendURL}/post/delete/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((res) => {
          setPosts(posts.filter((post) => post._id !== res.data._id))
        })
        .catch((err) => console.log(err))
  }

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "20px",
            flexDirection: "column"
          }}
        >
          <PostForm onSubmit={onSubmit} editValue={edit?.description} id={edit?.postId} onEdit={onEditSubmit} />
          <Link style={{ textDecoration: "none" }} to="/search/all">
            <Button variant='outlined'>Looking for people to follow?</Button>
          </Link>
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
              <Post
                key={post._id}
                post={post}
                onLikedPost={handleLikePost}
                posts={posts}
                setPosts={setPosts}
                handleEdit={() => handleEdit(post.description, post._id)}
                handleDelete={() => handleDelete(post._id)}
              />
            )
          })}
        </Container>

      </ThemeProvider>
    </>
  )
}

export default Home
