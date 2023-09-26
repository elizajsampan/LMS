import { useRef, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Grid,
  Tab,
  Typography,
} from "@mui/material";
import Footer from "./Footer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import bgImage1 from "../assets/white-background.jpg";

export default function MediaListAndPlayer({
  selectedCourseContents,
  selectedCourse,
}) {
  const [vidContent, setVidContent] = useState({
    video_content: null,
    content_title: null,
  });

  const handleVideoChange = (selectedCourseContent) => {
    setVidContent({
      video_content: selectedCourseContent.video_content,
      content_title: selectedCourseContent.content_title,
    });
  };
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!selectedCourse) {
    return null;
  }
  return (
    <>
      <Grid display="d-flex" flexDirection="row">
        <Grid item>
          <div
            dangerouslySetInnerHTML={{
              __html: `<iframe width="1120" height="420" title="YouTube video player" frameborder="1" src=${
                vidContent.video_content ?? "/course/iframe"
              } allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
            }}
          ></div>
          <Box
            border="solid 1px gray"
            marginTop={-1}
            sx={{ width: 1119, backgroundImage: `url(${bgImage1})` }}
          >
            <center>
              <Card
                sx={{
                  marginBottom: 3,
                  width: "97%",
                  minWidth: "97%",
                  opacity: "90",
                }}
              >
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange}>
                      <Tab label="Overview" value="1" />
                      <Tab label="Connect" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <List
                      sx={{
                        width: "97%",
                        minWidth: "97%",
                      }}
                    >
                      <Divider textAlign="left">
                        <b>COURSE NAME</b>
                      </Divider>
                      <ListItem sx={{ marginTop: 1, marginBottom: 1 }}>
                        <Typography variant="body1" sx={{ marginLeft: 18 }}>
                          {selectedCourse.course_name}
                        </Typography>
                      </ListItem>
                      <Divider textAlign="left">
                        <b>ABOUT THIS COURSE</b>
                      </Divider>
                      <ListItem sx={{ marginTop: 1 }}>
                        <Typography variant="body1" sx={{ marginLeft: 18 }}>
                          {selectedCourse.description}
                        </Typography>
                      </ListItem>
                    </List>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box
                      display="d-flex"
                      flexDirection="row"
                      justifyContent="left"
                      sx={{
                        marginBottom: 3,
                        width: "97%",
                        minWidth: "97%",
                      }}
                    >
                      <Typography variant="h5">
                        <b>CONNECT WITH US</b>
                      </Typography>
                      <Typography marginLeft={-18}>
                        <br />
                        <br />
                        Subscribe to{" "}
                        <a href="https://www.youtube.com/channel/UCGwZQG75XI4R82guNzpvPAA">
                          us
                        </a>{" "}
                        on Youtube for more free contents right at your Youtube
                        Feed!
                        <br />
                      </Typography>
                    </Box>
                  </TabPanel>
                </TabContext>
              </Card>
            </center>
          </Box>
          <Grid marginTop={-1}>
            <Footer />
          </Grid>
        </Grid>
        <Grid item>
          <List
            sx={{
              width: "100%",
              height: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              minWidth: 400,
              backgroundImage: `url(${bgImage1})`,
            }}
            subheader={<li />}
          >
            <ListSubheader component={Typography} variant="h3">
              Course Content
            </ListSubheader>
            <Divider />
            {selectedCourseContents.length !== 0 ? (
              selectedCourseContents.map((selectedCourseContent) => (
                <Grid
                  container
                  display="d-flex"
                  flexDirection="row"
                  justifyContent="left"
                  sx={{
                    ":hover": {
                      backgroundColor: "gray",
                      color: "white",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Grid item xs={0.5} sx={{ marginTop: 0.3 }}>
                    <Checkbox size="small" sx={{ marginLeft: 0.5 }} />
                  </Grid>
                  <Grid item xs={11.5}>
                    <ListItem
                      component={Typography}
                      variant="body2"
                      onClick={() => handleVideoChange(selectedCourseContent)}
                      key={selectedCourseContent.lesson_num}
                      sx={{
                        marginTop: 0.5,

                        flexFlow: "row wrap",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {selectedCourseContent.lesson_num}
                      .&nbsp;&nbsp;
                      {selectedCourseContent.content_title}
                    </ListItem>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid
                container
                display="d-flex"
                flexDirection="row"
                justifyContent="left"
              >
                <Grid item xs={12}>
                  <Typography marginLeft={3} marginTop={1}>
                    No contents available
                  </Typography>
                </Grid>
              </Grid>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
