import React, { useEffect, useState } from "react";
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
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { useContext } from "react";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import { AuthContext } from "../context/auth/AuthContext";
import { v4 as idGenerator } from "uuid";
import noImage from "../assets/no_image.jpg";
import InfoIcon from "@mui/icons-material/Info";

const SearchCourseCard = ({ course }) => {
  const { myCourses, handleAddToMyCourses: onAddToMyCourses } =
    useContext(MyCoursesContext);

  const { userData, fetchUserData, authToken } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleAddToMyCourses = async (course) => {
    await onAddToMyCourses(course);
  };

  const [searchFilteredMyCourse] = useState(
    myCourses
      ? myCourses.filter((myCourse) => {
          if (myCourse.course_id !== course.courseId) {
            return myCourse;
          }
          return null;
        })
      : course
  );

  const [searchFilteredCourse] = useState(
    searchFilteredMyCourse[0]?.course_id !== course.course_id ? course : null
  );

  console.log(searchFilteredCourse);
  if (!course || !searchFilteredCourse) {
    return null;
  }

  return searchFilteredCourse ? (
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
                image={searchFilteredCourse.image_url || noImage}
                sx={{ width: 200, height: 200 }}
              />
            </Box>
            <Box>
              <CardContent sx={{ width: 600 }}>
                <Typography variant="h5">
                  <span style={{ fontWeight: "bold" }}>
                    {searchFilteredCourse.course_name}
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
                      {searchFilteredCourse.description}
                    </span>
                  }
                </Typography>
              </CardContent>
            </Box>
          </Box>
          {userData?.role === "admin" ? (
            <></>
          ) : (
            <Box
              component="a"
              href={!authToken ? "/login" : "/"}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              bgcolor="gray"
              sx={{
                ":hover": { bgcolor: "black", cursor: "pointer" },
                textDecoration: "none",
              }}
              onClick={() =>
                handleAddToMyCourses({
                  myCourseId: idGenerator(),
                  courseId: searchFilteredCourse.course_id,
                  userId: userData.userId,
                })
              }
            >
              <CardContent>
                <center>
                  <IconButton aria-label="Enroll">
                    <Tooltip title="Enroll Course" arrow>
                      <IconButton>
                        <SubscriptionsIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Tooltip>
                  </IconButton>
                  <center>
                    <Typography color="white">Enroll</Typography>
                  </center>
                </center>
              </CardContent>
            </Box>
          )}
          <Box
            component="a"
            display="d-flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="gray"
            href={"/course/id/" + searchFilteredCourse.course_id}
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
                      <InfoIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                </IconButton>
                <center>
                  <Typography color="white">Details</Typography>
                </center>
              </center>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Grid>
  ) : (
    <></>
  );
};

export default SearchCourseCard;
