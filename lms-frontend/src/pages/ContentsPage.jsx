import { Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import ContentsTable from "../components/ContentsTable";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { ContentsContext } from "../context/contents/ContentsContext";
import { CoursesContext } from "../context/courses/CoursesContext";
import image from "../assets/white-background.jpg";

const ContentsPage = () => {
  const { contents, fetchAllContents } = useContext(ContentsContext);
  const { fetchAllCourses, courses } = useContext(CoursesContext);

  fetchAllContents();
  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  return (
    <Grid sx={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      <NavbarLoggedIn />
      <Grid item xs={12}>
        <ContentsTable contents={contents} courses={courses} />
      </Grid>
      <Footer />
    </Grid>
  );
};

export default ContentsPage;
