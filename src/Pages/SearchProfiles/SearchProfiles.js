import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Link, Divider } from '@mui/material';

import { useParams } from "react-router-dom";
import Nav from "../../Components/Nav/Nav";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/system';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function SearchProfiles() {
  const { name } = useParams()
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:4000/user/search/${name}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setProfiles(res.data))
      .catch((err) => console.log(err))
  }, [name])

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
          <Typography variant='h4' mt="10px" mb="10px">All results matching {name}:</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(36,37,38)",
              width: "500px",
              maxWidth: "100%",
              padding: "5px"
            }}
          >
            {
              profiles.map(profile => {
                return (
                  <Link
                    variant='h6'
                    href={"/profile/" + profile._id}
                    sx={{

                      textDecoration: "none"
                    }}
                  >
                    {profile.firstName + " " + profile.lastName}
                    <Divider />
                  </Link>
                )
              })}
          </Box>
        </Container>
      </ThemeProvider>

    </>
  )
}

export default SearchProfiles