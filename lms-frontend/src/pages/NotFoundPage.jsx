import { Grid, Typography, Box } from "@mui/material";
import { useContext } from "react";
import image from "../assets/19742.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { AuthContext } from "../context/auth/AuthContext";

const NotFoundPage = () => {
  const { authToken } = useContext(AuthContext);

  return (
    <Grid>
      {authToken ? <NavbarLoggedIn /> : <Navbar />}
      <center>
        <Box
          height={500}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography
            sx={{ color: "purple", fontFamily: "cursive", fontSize: 200 }}
          >
            Oops!
          </Typography>
          <br />
          <Typography variant="h6">404 - Page Not Found</Typography>
          <br />
          <Typography variant="body1">
            The page you are looking for might have been removed,
            <br />
            had its name changed or is temporarily unavailable.
          </Typography>
        </Box>
        <br />
        <br />
      </center>
      <Footer />
    </Grid>
  );
};

export default NotFoundPage;
