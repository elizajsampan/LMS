import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { CoursesContext } from "../context/courses/CoursesContext";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import UnsubscribeIcon from "@mui/icons-material/Unsubscribe";
import noImage from "../assets/no_image.jpg";

const MyCourseCard = ({ myCourse }) => {
  const { courses } = useContext(CoursesContext);
  const { fetchMyCourses, handleRemoveFromMyCourses: onRemoveToMyCourses } =
    useContext(MyCoursesContext);
  const [myFilteredCourse] = useState(
    courses.filter((course) => {
      if (myCourse.course_id === course.courseId) {
        return course;
      }
      return null;
    })
  );
  const handleRemoveFromMyCourses = async () => {
    await onRemoveToMyCourses(myCourse.my_course_id);
    fetchMyCourses();
  };

  console.log(myFilteredCourse);
  if (!myFilteredCourse) {
    return null;
  }

  return (
    <Grid xs={12} sx={{ opacity: "95%" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ height: 200 }}
      >
        <Card
          component={Paper}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          elevation="8"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                image={myFilteredCourse[0].imageUrl ?? noImage}
                sx={{
                  width: 200,
                  height: 200,
                }}
              />
            </Box>
            <Box>
              <CardContent sx={{ width: 600 }}>
                <Typography variant="h5">
                  <span style={{ fontWeight: "bold" }}>
                    {myFilteredCourse[0].courseName}
                  </span>
                </Typography>
                <br></br>
                <Typography variant="caption">
                  {
                    <span
                      style={{
                        fontSize: "15px",
                        color: "primary",
                      }}
                    >
                      {myFilteredCourse[0].description}
                    </span>
                  }
                </Typography>
              </CardContent>
            </Box>
          </Box>
          <Box
            component="a"
            href="/"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="gray"
            sx={{
              ":hover": { bgcolor: "black", cursor: "pointer" },
              textDecoration: "none",
            }}
            onClick={() => handleRemoveFromMyCourses()}
          >
            <CardContent>
              <center>
                <IconButton aria-label="Enroll">
                  <Tooltip title="Enroll Course" arrow>
                    <IconButton>
                      <UnsubscribeIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </IconButton>
                <center>
                  <Typography color="white">Unenroll</Typography>
                </center>
              </center>
            </CardContent>
          </Box>
          <Box
            component="a"
            display="d-flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="gray"
            href={"/course/learn/" + myFilteredCourse[0].courseId}
            sx={{
              ":hover": { bgcolor: "black", cursor: "pointer" },
              textDecoration: "none",
            }}
          >
            <CardContent>
              <center>
                <IconButton aria-label="Details">
                  <Tooltip title="Details" arrow>
                    <IconButton>
                      <LocalLibraryIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </IconButton>
                <center>
                  <Typography color="white">Learn Now</Typography>
                </center>
              </center>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
};

export default MyCourseCard;
