import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import CoursesTable from "../components/CoursesTable";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { CoursesContext } from "../context/courses/CoursesContext";
import image from "../assets/white-background.jpg";

const CoursesPage = () => {
  const { courses, fetchAllCourses } = useContext(CoursesContext);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);
  return (
    <Grid sx={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      <NavbarLoggedIn />
      <Grid item xs={12}>
        <CoursesTable courses={courses} />
      </Grid>
      <Footer />
    </Grid>
  );
};

export default CoursesPage;
