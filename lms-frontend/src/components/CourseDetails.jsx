import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
  ListItem,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { v4 as idGenerator } from "uuid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import { AuthContext } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CourseDetails = ({ selectedCourseContents, selectedCourse }) => {
  const { handleAddToMyCourses: onAddToMyCourses } =
    useContext(MyCoursesContext);
  const { authToken, userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddToMyCourses = async (course) => {
    if (authToken) {
      await onAddToMyCourses(course);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  if (!selectedCourse) {
    return null;
  }

  if (!selectedCourseContents) {
    return null;
  }
  return (
    <Grid container display="d-flex" flexDirection="row">
      <Box
        sx={{ width: "100%", height: "33vh", backgroundColor: "gray", mt: 3 }}
      >
        <Grid sx={{ ml: 18, mt: authToken ? 6 : 3 }}>
          <Typography variant="h4">{selectedCourse.course_name}</Typography>
          <br />
          <Typography variant="h6">Course Overview:</Typography>
          <br />
          <Grid item xs={7}>
            <Typography variant="body" sx={{ wordBreak: "break-word" }}>
              {selectedCourse.description}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={8}>
        <Grid container sx={{ mt: 5, ml: 8 }}>
          <Accordion sx={{ width: "90%", opacity: "90%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ flexDirection: "row-reverse" }}
            >
              <Typography variant="h5">
                &nbsp;&nbsp;<b>Course Content</b>
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ opacity: "90%", mt: -3, mb: -1.5 }}>
              <List>
                {selectedCourseContents.length !== 0 ? (
                  selectedCourseContents.map((selectedCourseContent) => (
                    <>
                      <Divider />
                      <ListItem>
                        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                        {selectedCourseContent.lesson_num}
                        .&nbsp;&nbsp;
                        {selectedCourseContent.content_title}
                      </ListItem>
                    </>
                  ))
                ) : (
                  <>
                    {" "}
                    <Divider />
                    <ListItem>No content available</ListItem>
                  </>
                )}
                <Divider />
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Box position="static" sx={{ mt: -15, ml: 3 }}>
          <Card
            sx={{
              height: "auto",
              width: 300,
              opacity: "90%",
            }}
            elevation="6"
          >
            <center>
              <CardMedia
                component="img"
                src={selectedCourse.image_url}
                sx={{ height: 200, width: 200 }}
              ></CardMedia>
              <Divider sx={{ border: "0.5px solid black" }} />
              <CardContent>
                {userData?.role !== "admin" ? (
                  <>
                    <br />
                    <Grid alignContent="center">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "black" }}
                        onClick={() =>
                          handleAddToMyCourses({
                            myCourseId: idGenerator(),
                            courseId:
                              selectedCourse.courseId ||
                              selectedCourse.course_id,
                            userId: userData?.userId,
                          })
                        }
                      >
                        Enroll Course
                      </Button>
                    </Grid>{" "}
                    <br />
                  </>
                ) : (
                  <></>
                )}
                <Grid>
                  {selectedCourseContents.length === 0 ? (
                    <Typography>
                      This course currently has no content.
                    </Typography>
                  ) : (
                    <Typography>
                      This course is consists of {selectedCourseContents.length}{" "}
                      lessons.
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </center>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CourseDetails;
