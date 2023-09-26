import { Box, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import Courses from "../components/Courses";
import { CoursesContext } from "../context/courses/CoursesContext";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import bgImage from "../assets/circuit_bg.jpg";

const LearnPage = () => {
  const { courses, fetchAllCourses } = useContext(CoursesContext);
  const { fetchMyCourses } = useContext(MyCoursesContext);
  const { authToken } = useContext(AuthContext);
  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  const onload = () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  onload();

  return (
    <>
      {authToken ? <NavbarLoggedIn /> : <Navbar />}
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: authToken ? 0 : -3,
        }}
      >
        <Grid container display="d-flex" flexDirection="column">
          <Grid item xs={3} sx={{ marginTop: 3 }}>
            <center>
              <LightbulbIcon
                sx={{
                  width: 150,
                  height: 150,
                  color: "yellow",
                }}
              />
              <Typography variant="h4" color="yellow">
                Learn
              </Typography>
            </center>
          </Grid>
          <Grid item xs={9} sx={{ marginTop: 5 }}>
            <Box
              sx={{
                marginLeft: 10.1,
                bgcolor: "black",
                width: 978,
                borderRadius: 2,
              }}
            >
              <center>
                <Typography variant="h5" color="white">
                  <b>Available Courses</b>
                </Typography>
              </center>
            </Box>
            <Courses courses={courses} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default LearnPage;
