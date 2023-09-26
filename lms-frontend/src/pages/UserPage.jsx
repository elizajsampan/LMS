import { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Footer from "../components/Footer";
import MyCourses from "../components/MyCourses";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import { CoursesContext } from "../context/courses/CoursesContext";
import bgImage from "../assets/retrosupply-jLwVAUtLOAQ-unsplash.jpg";
import HomeIcon from "@mui/icons-material/Home";
import { AuthContext } from "../context/auth/AuthContext";

const UserPage = () => {
  const { myCourses, fetchMyCourses } = useContext(MyCoursesContext);
  const { fetchAllCourses } = useContext(CoursesContext);
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);
  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  const useDate = () => {
    const locale = "en";
    const [today, setDate] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, []);

    const day = today.toLocaleDateString(locale, { weekday: "long" });
    const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(
      locale,
      { month: "long" }
    )}\n\n`;

    const hour = today.getHours();
    const wish = `Good ${
      (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "evening"
    }, ${userData.first_name}!`;

    const time = today.toLocaleTimeString(locale, {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      second: "numeric",
    });

    return {
      date,
      time,
      wish,
    };
  };
  const onload = () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };
  onload();
  return (
    <>
      <NavbarLoggedIn />
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid container display="d-flex" flexDirection="column">
          <Grid item xs={3} sx={{ marginTop: 3 }}>
            <center>
              <HomeIcon
                sx={{ width: 150, height: 150, color: "white", opacity: "90%" }}
              />
              <Typography variant="h4" color="white">
                Learner Dashboard
              </Typography>
            </center>
            <Card sx={{ width: "100%", mt: 9, opacity: "90%" }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ ml: 3, wordBreak: "break-word" }}
                >
                  <b>{useDate().wish}</b>
                </Typography>
              </CardContent>
            </Card>
            <br />
            <br />
            <br />
            <br />
            <div align="left">
              <Typography variant="h5" sx={{ mr: 3, color: "white" }}>
                <b>
                  Today is:
                  <br />
                  {useDate().date}&nbsp;{useDate().time}
                </b>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={9} sx={{ marginTop: 5 }}>
            <Box
              sx={{
                marginLeft: 8.5,
                bgcolor: "black",
                width: 1002,
                borderRadius: 2,
              }}
            >
              <center>
                <Typography variant="h5" color="white">
                  <b>My Courses</b>
                </Typography>
              </center>
            </Box>
            <MyCourses myCourses={myCourses} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default UserPage;
