import { useContext } from "react";
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
} from "@mui/material";
import image from "../assets/logo.png";
import { CoursesContext } from "../context/courses/CoursesContext";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { blue, grey } from "@mui/material/colors";

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

const Navbar = () => {
  const navigate = useNavigate();
  const { courses } = useContext(CoursesContext);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value) {
      navigate("/search?courses=" + event.target.value);
    }
  };

  if (!courses) {
    return null;
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar disableGutters sx={{ backgroundColor: "black", height: 120 }}>
          <Box component="nav" position="absolute" top="0.5rem" width="100%">
            <Container>
              <Grid container flexDirection="row" alignItems="center">
                <Box
                  component="img"
                  sx={{ width: "15vh", mt: -1, ml: -10, cursor: "pointer" }}
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
                      Home
                    </Typography>
                  </Box>
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
                </Box>
              </Grid>
            </Container>
          </Box>
        </Toolbar>
      </AppBar>
      <Button
        sx={{
          bgcolor: "white",
          marginLeft: 155,
          marginTop: -20,
          color: "black",
          ":hover": { backgroundColor: grey[500] },
        }}
        onClick={() => navigate("/register")}
      >
        Sign up
      </Button>
      <Button
        sx={{
          bgcolor: "aqua",
          marginLeft: 2,
          marginTop: -20,
          color: "black",
          ":hover": { backgroundColor: blue[500] },
        }}
        onClick={() => navigate("/login")}
      >
        Log in
      </Button>
    </>
  );
};
export default Navbar;
