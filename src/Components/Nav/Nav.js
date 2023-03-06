import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';

import { useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

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

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              textDecoration: 'none',
              letterSpacing: '.3rem',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            Odinbook
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Link variant="h6" href='/' sx={{ textDecoration: 'none', color: "white", marginRight: 3 }}>Home</Link>
            <Link variant="h6" href='/' sx={{ textDecoration: 'none', color: "white" }}>Profile</Link>
          </Box>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography variant="h6">{user}</Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem><Link href='/' sx={{ textDecoration: 'none', color: "white" }}>Profile</Link></MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Nav