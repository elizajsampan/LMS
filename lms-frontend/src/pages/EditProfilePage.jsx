import { Container, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import EditProfileForm from "../components/EditProfileForm";
import EditProfileSidebar from "../components/EditProfileSidebar";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { AuthContext } from "../context/auth/AuthContext";
import bgImage from "../assets/crystal-pattern.jpg";

const EditProfilePage = () => {
  const { fetchUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!userData) {
    return null;
  }

  return (
    <Grid
      sx={{
        backgroundImage: `url(${bgImage})`,
        height: "100%",
      }}
    >
      <NavbarLoggedIn />
      <Container sx={{ marginTop: 5, marginBottom: 3 }}>
        <Grid display="d-flex" flexDirection="row" sx={{ opacity: "90%" }}>
          <EditProfileSidebar />
          <EditProfileForm />
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
};

export default EditProfilePage;
