import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseDetails from "../components/CourseDetails";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { AuthContext } from "../context/auth/AuthContext";
import { CoursesContext } from "../context/courses/CoursesContext";
import cardbg from "../assets/19742.jpg";
import { Box, Grid } from "@mui/material";

const CourseDetailsPage = () => {
  const { authToken } = useContext(AuthContext);
  const params = useParams();
  const {
    selectedCourseContents,
    fetchSelectedCourseContents,
    handleResetSelectedCourseContents,
    fetchSelectedCourse,
    handleResetSelectedCourse,
    selectedCourse,
  } = useContext(CoursesContext);

  useEffect(() => {
    fetchSelectedCourseContents(params.courseId);
    return () => handleResetSelectedCourseContents();
  }, [fetchSelectedCourseContents, handleResetSelectedCourseContents, params]);

  useEffect(() => {
    fetchSelectedCourse(params.courseId);
    return () => handleResetSelectedCourse();
  }, [fetchSelectedCourse, handleResetSelectedCourse, params]);

  return (
    <>
      {authToken ? <NavbarLoggedIn /> : <Navbar />}
      <Box
        sx={{
          backgroundImage: `url(${cardbg})`,
          backgroundSize: "cover",
          height: "100vh",
          mt: -6,
        }}
      >
        <CourseDetails
          selectedCourseContents={selectedCourseContents}
          selectedCourse={selectedCourse}
        />
      </Box>
      <Grid sx={{ mt: 0 }}>
        <Footer />
      </Grid>
    </>
  );
};

export default CourseDetailsPage;
