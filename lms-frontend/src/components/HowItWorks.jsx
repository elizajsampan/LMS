import { Box, Button, Container, Grid, Typography } from "@mui/material";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import bgImage2 from "../assets/19742.jpg";

const HowItWorks = () => {
  const item = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    px: 5,
  };

  const number = {
    fontSize: 24,
    fontFamily: "default",
    color: "secondary.main",
    fontWeight: "medium",
  };

  const image = {
    height: 55,
    my: 4,
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        bgcolor: "secondary.light",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={bgImage2}
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.3,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 14 }}>
          How It Works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box component="img" src={step1} sx={image} />
                <Typography variant="h5" align="center">
                  Create and sign in your æ.codes account.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box component="img" src={step2} sx={image} />
                <Typography variant="h5" align="center">
                  Choose what programming course or any specific topic you want
                  to pursue.
                  <br /> All is free here!
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box component="img" src={step3} sx={image} />
                <Typography variant="h5" align="center">
                  {"Watch the video/s to learn what you chose. "}
                  {"There you go, happy learning!"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          component="a"
          href="/register"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
};

export default HowItWorks;
