import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import CourseCard from "./CourseCard";

const Courses = ({ courses }) => {
  const { myCourses } = useContext(MyCoursesContext);

  if (!courses) {
    return null;
  }

  return myCourses && courses.length - myCourses.length === 0 ? (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      marginBottom={5}
      marginTop={-4}
    >
      <Grid item xs={12}>
        <Card sx={{ width: 975, marginLeft: 10.3, marginTop: 3 }}>
          <center>
            <Typography variant="h5">
              <b>No Courses Available</b>
            </Typography>
          </center>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Grid justifyContent="center" marginBottom={5}>
      {courses.map((course) => (
        <Grid key={course.courseId} item xs={12}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Courses;
