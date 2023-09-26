import { Container, Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import EditProfileForm2 from "../components/EditProfileForm2";
import EditProfileSidebar2 from "../components/EditProfileSidebar2";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { AuthContext } from "../context/auth/AuthContext";
import bgImage from "../assets/crystal-pattern.jpg";

const ProfileSecurityPage = () => {
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
          <EditProfileSidebar2 />
          <EditProfileForm2 />
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
};

export default ProfileSecurityPage;
