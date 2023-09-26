import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import SearchCourseCard from "./SearchCourseCard";

const SearchCourses = ({ courses }) => {
  if (!courses) {
    return null;
  }
  console.log(courses);
  return courses.length === 0 ? (
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
    <Grid container spacing={3} justifyContent="center" marginBottom={3}>
      {courses.map((course) => (
        <Grid key={course.courseId} item xs={12}>
          <SearchCourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchCourses;
