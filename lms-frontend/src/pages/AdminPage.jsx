import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AdminMenu from "../components/AdminMenu";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { AuthContext } from "../context/auth/AuthContext";
import image from "../assets/admin.jpg";
const AdminPage = () => {
  const { fetchUserData, handleResetUserData } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
    return () => {
      handleResetUserData();
    };
  }, [fetchUserData, handleResetUserData]);

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
    }, Admin! `;

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

  return (
    <Grid sx={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
      <NavbarLoggedIn />
      <br />
      <center>
        <Typography variant="h4">Admin Dashboard</Typography>
      </center>
      <Card sx={{ width: "20%", mt: 3, opacity: "90%" }}>
        <CardContent>
          <Typography variant="h5" sx={{ ml: 3 }}>
            <b>{useDate().wish}</b>
          </Typography>
        </CardContent>
      </Card>
      <AdminMenu />
      <br />
      <br />
      <br />
      <div align="right">
        <Typography variant="h5" sx={{ mr: 3 }}>
          <b>
            Today is: {useDate().date}&nbsp;{useDate().time}
          </b>
        </Typography>
      </div>
      <Footer />
    </Grid>
  );
};

export default AdminPage;
