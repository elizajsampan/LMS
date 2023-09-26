import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import SearchCourses from "../components/SearchCourses";
import { AuthContext } from "../context/auth/AuthContext";
import { CoursesContext } from "../context/courses/CoursesContext";
import { MyCoursesContext } from "../context/mycourses/MyCoursesContext";
import bgImage from "../assets/search-results.jpg";
import SearchIcon from "@mui/icons-material/Search";

const SearchResultsPage = () => {
  const { fetchFilteredCourses, handleResetFilteredCourses, filteredCourses } =
    useContext(CoursesContext);
  const { authToken, userData } = useContext(AuthContext);
  const { fetchMyCourses } = useContext(MyCoursesContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchFilteredCourses(searchParams.get("courses"));
    return () => {
      handleResetFilteredCourses();
    };
  }, [fetchFilteredCourses, searchParams, handleResetFilteredCourses]);

  const onload = () => {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  if (!filteredCourses) {
    return null;
  }

  onload();

  return (
    <>
      {authToken ? <NavbarLoggedIn /> : <Navbar />}
      <Box
        display="flex"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: authToken ? 0 : -3,
        }}
      >
        <Grid container display="d-flex" flexDirection="column">
          <Grid item xs={3} sx={{ marginTop: 3 }}>
            <center>
              <SearchIcon
                sx={{
                  width: 150,
                  height: 150,
                  color: "white",
                }}
              />
              <Typography variant="h4" color="white">
                Search
              </Typography>
            </center>
          </Grid>
          <Grid item xs={9} sx={{ marginTop: 5 }}>
            <Box
              sx={{
                marginLeft: userData?.role === "admin" ? 15.5 : 10.1,
                bgcolor: "black",
                width: userData?.role === "admin" ? 890 : 978,
                borderRadius: 2,
              }}
            >
              <center>
                <Typography variant="h5" color="white">
                  <b>Search results for "{searchParams.get("courses")}"</b>
                </Typography>
              </center>
            </Box>
            <SearchCourses courses={filteredCourses} />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default SearchResultsPage;
