import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Divider } from '@mui/material';

import axios from 'axios';
import Nav from "../../Components/Nav/Nav";
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function SearchAllUsers() {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/user/searchall", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(res => { setAllUsers(res.data); console.log(res.data) })
      .catch(err => console.log(err))
  }, [])

  console.log(allUsers)

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography variant='h4' mt="10px" mb="10px">All registered users:</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(36,37,38)",
              width: "500px",
              maxWidth: "100%",
              padding: "5px",
              borderRadius: "15px"
            }}
          >
            {
              allUsers.map(users => {
                return (
                  <Link
                    to={"/profile/" + users._id}
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    <Typography variant='h6' color="primary">
                      {users.firstName + " " + users.lastName}
                    </Typography>
                    <Divider />
                  </Link>
                )
              })
            }
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default SearchAllUsers