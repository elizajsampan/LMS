import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { CoursesContext } from "../context/courses/CoursesContext";

const EditCoursePage = () => {
  const { fetchSelectedCourse, handleResetSelectedCourse, selectedCourse } =
    useContext(CoursesContext);

  const { courseId } = useParams();

  useEffect(() => {
    fetchSelectedCourse(courseId);
    return () => {
      handleResetSelectedCourse();
    };
  }, [fetchSelectedCourse, handleResetSelectedCourse, courseId]);

  if (!selectedCourse) {
    return null;
  }
  return (
    <Grid>
      <NavbarLoggedIn />
      <CourseForm initialFormValue={selectedCourse} />
      <Footer />
    </Grid>
  );
};

export default EditCoursePage;
