import { useContext, useRef } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Introduction from "../components/Introduction";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { AuthContext } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { CoursesContext } from "../context/courses/CoursesContext";

const HomePage = () => {
  const { fetchUserData } = useContext(AuthContext);
  const ref = useRef(null);
  const { fetchAllCourses } = useContext(CoursesContext);

  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchUserData();
    fetchAllCourses();
  }, [fetchUserData, fetchAllCourses]);

  return (
    <Box component="header" position="relative">
      <Navbar />
      <Introduction handleClick={handleClick} />
      <div ref={ref}>
        <HowItWorks />
      </div>
      <Footer />
    </Box>
  );
};

export default HomePage;
