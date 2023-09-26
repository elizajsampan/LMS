import { Card, Grid, Typography } from "@mui/material";
import MyCourseCard from "./MyCourseCard";

const MyCourses = ({ myCourses }) => {
  return myCourses.length === 0 ? (
    <Grid container spacing={2} justifyContent="center" marginBottom={5}>
      <Grid item xs={12}>
        <Card sx={{ width: 1000.7, marginLeft: 8.5, marginTop: 2 }}>
          <center>
            <Typography variant="h5">
              <b>
                You have no courses enrolled. Please proceed to Learn or Search
                to enroll a course.
              </b>
            </Typography>
          </center>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Grid container spacing={2} justifyContent="center" marginBottom={5}>
      {myCourses.map((myCourse) => (
        <Grid key={myCourse.course_id} item xs={12}>
          <MyCourseCard myCourse={myCourse} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyCourses;
