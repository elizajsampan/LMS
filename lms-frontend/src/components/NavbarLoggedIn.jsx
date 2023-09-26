import { useContext, useState } from "react";
import {
  Button,
  Grid,
  Link,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  styled,
  alpha,
  InputBase,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import image from "../assets/logo.png";
import { AuthContext } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginTop: -50,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "60ch",
    },
  },
}));

const NavbarLoggedIn = ({ searchValue }) => {
  const { signOut, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleClick = (event) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClickUser = (event) => {
    if (anchorElUser !== event.currentTarget) {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value) {
      navigate("/search?courses=" + event.target.value);
    }
  };

  const handleLogout = () => {
    signOut();
  };

  const handleEditProfile = () => {
    navigate("/edit-profile/profile");
  };

  if (!userData) {
    return null;
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters sx={{ backgroundColor: "black", height: 120 }}>
          <Box
            component="nav"
            position="absolute"
            top="0.5rem"
            width="100%"
            sx={{ marginTop: 1 }}
          >
            <Container>
              <Grid container flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  sx={{
                    height: "12vh",
                    width: "12vh",
                    mt: -1,
                    ml: -10,
                    cursor: "pointer",
                  }}
                  src={image}
                  onClick={() => navigate("/")}
                />
                <Search onKeyDown={handleKeyPress}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search for available courses…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <Button
                  variant="outlined"
                  sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
                >
                  <Box component="i" color="white" className="fas fa-bars" />
                </Button>
                <Box
                  component="ul"
                  display={{ xs: "none", lg: "flex" }}
                  p={0}
                  my={0}
                  mx="auto"
                  sx={{ listStyle: "none", marginLeft: -73, marginTop: 7 }}
                >
                  <Box component="li">
                    <Typography
                      component={Link}
                      href="/"
                      variant="button"
                      color="white"
                      fontWeight="regular"
                      p={3}
                    >
                      Dashboard
                    </Typography>
                  </Box>
                  {userData.role === "user" ? (
                    <>
                      <Box component="li">
                        <Typography
                          component={Link}
                          href="/learn"
                          variant="button"
                          color="white"
                          fontWeight="regular"
                          p={3}
                        >
                          Learn
                        </Typography>
                      </Box>
                      <Box component="li">
                        <Typography
                          component={Link}
                          href="/community"
                          variant="button"
                          color="white"
                          fontWeight="regular"
                          p={3}
                        >
                          Community
                        </Typography>
                      </Box>
                      {/* <Box component="li">
                    <Typography
                      component={Link}
                      href="#"
                      variant="button"
                      color="white"
                      fontWeight="regular"
                      p={3}
                      onClick={(e) => e.preventDefault()}
                    >
                      About Us
                    </Typography>
                  </Box> */}
                      <Box component="li">
                        <Typography
                          component={Link}
                          variant="button"
                          color="white"
                          fontWeight="regular"
                          p={3}
                          target="_blank"
                          rel="noopener noreferrer"
                          href="mailto:aong@77global.biz,ejaropojop@88global.biz"
                        >
                          Contact Us
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box component="li">
                        <Typography
                          component={Link}
                          sx={{ cursor: "pointer" }}
                          variant="button"
                          color="white"
                          fontWeight="regular"
                          p={3}
                          onClick={handleClick}
                          onMouseOver={handleClick}
                        >
                          Admin
                        </Typography>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          MenuListProps={{ onMouseLeave: handleClose }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          disableScrollLock
                        >
                          <MenuItem
                            component="a"
                            href="/course"
                            onClick={handleClose}
                          >
                            Courses
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            component="a"
                            href="/content"
                            onClick={handleClose}
                          >
                            Contents
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            component="a"
                            href="/user"
                            onClick={handleClose}
                          >
                            Users
                          </MenuItem>
                        </Menu>
                      </Box>
                      <Box component="li">
                        <Typography
                          component={Link}
                          href="/community"
                          variant="button"
                          color="white"
                          fontWeight="regular"
                          p={3}
                        >
                          Community
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Container>
          </Box>
          <Box
            sx={{
              marginLeft: 180,
            }}
          >
            <IconButton
              onClick={handleClickUser}
              onMouseOver={handleClickUser}
              sx={{ p: 0 }}
            >
              <Avatar
                alt={`${userData.first_name[0]}${userData.last_name[0]}`}
                src={userData.image_url}
                sx={{ height: 50, width: 50 }}
              />
            </IconButton>
            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              disableScrollLock
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handleCloseUser}
              MenuListProps={{ onMouseLeave: handleCloseUser }}
            >
              <MenuItem onClick={() => handleEditProfile()}>
                {`${userData.first_name} ${userData.last_name}`}
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleLogout()}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavbarLoggedIn;
