import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

import { useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { useNavigate, Link } from 'react-router-dom';
import { TextField } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [searchTerm, setSearchTerm] = useState('')

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    navigate("/login");
  }

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchTerm}`)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            Odinbook
          </Typography>

          <Box component="form" onSubmit={onSubmit} >
            <TextField
              rows="2"
              placeholder="Search"
              id="search-bar"
              label="Search"
              name="search-bar"
              fullWidth
              onChange={onChangeSearchTerm}
            />
          </Box>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ gap: "5px" }}
          >
            <AccountCircle />
            <Typography variant="h6">{user.username}</Typography>
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem><Link to={"/profile/" + user.userId} style={{ textDecoration: 'none', color: "white" }}>Profile</Link></MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Nav