import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import image from "../assets/white-background.jpg";
import UsersTable from "../components/UsersTable";
import { UserContext } from "../context/user/UserContext";

const UsersPage = () => {
  const { users, fetchAllUsers } = useContext(UserContext);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <Grid sx={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      <NavbarLoggedIn />
      <Grid item xs={12}>
        <UsersTable users={users} />
      </Grid>
      <Footer />
    </Grid>
  );
};

export default UsersPage;
