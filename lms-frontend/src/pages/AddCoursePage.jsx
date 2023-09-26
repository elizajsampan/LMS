import { Grid } from "@mui/material";
import CourseForm from "../components/CourseForm";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";

const AddCoursePage = () => {
  return (
    <Grid>
      <NavbarLoggedIn />
      <CourseForm />
      <Footer />
    </Grid>
  );
};

export default AddCoursePage;
