import React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import image from "../assets/loginpage.gif";

const LoginPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${image})`,
        backgroundSize: "repeat",
        height: "721px",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
