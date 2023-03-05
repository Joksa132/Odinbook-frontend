import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useContext } from "react"
import { UserContext } from "../../Context/UserContext"

import Nav from "../Nav/Nav"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function Home() {
  //const { user } = useContext(UserContext)

  return (
    <>
      <Nav />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}

export default Home
