import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import ContentForm from "../components/ContentForm";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { CoursesContext } from "../context/courses/CoursesContext";

const AddContentPage = () => {
  const { fetchAllCourses, handleResetCourses } = useContext(CoursesContext);

  useEffect(() => {
    fetchAllCourses();
    return () => {
      handleResetCourses();
    };
  }, [fetchAllCourses, handleResetCourses]);

  return (
    <Grid>
      <NavbarLoggedIn />
      <ContentForm />
      <Footer />
    </Grid>
  );
};

export default AddContentPage;
