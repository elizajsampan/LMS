import { Box } from "@mui/material";
import { useContext } from "react";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { CoursesContext } from "../context/courses/CoursesContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ContentsListAndPlayer from "../components/ContentsListAndPlayer";

const CourseViewPage = () => {
  const params = useParams();
  const {
    fetchSelectedCourseContents,
    fetchSelectedCourse,
    selectedCourseContents,
    selectedCourse,
  } = useContext(CoursesContext);

  useEffect(() => {
    fetchSelectedCourseContents(params.courseId);
    fetchSelectedCourse(params.courseId);
  }, [fetchSelectedCourseContents, fetchSelectedCourse, params]);

  useEffect(() => {
    localStorage.setItem("selectedCourse", selectedCourse);
  }, [selectedCourse]);

  return (
    <Box component="header" position="relative">
      <NavbarLoggedIn />
      <ContentsListAndPlayer
        selectedCourseContents={selectedCourseContents}
        selectedCourse={selectedCourse}
      />
    </Box>
  );
};

export default CourseViewPage;
