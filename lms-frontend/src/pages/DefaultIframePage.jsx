import { Box, Grid, Typography } from "@mui/material";
import bgImage from "../assets/crystal-pattern.jpg";

const DefaultIFramePage = () => {
  return (
    <Grid
      container
      display="d-flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Box
        minHeight="100vh"
        width="1116px"
        sx={{ backgroundImage: `url(${bgImage})` }}
      >
        <Typography variant="h4" sx={{ paddingLeft: 5 }}>
          <br />
          <br />
          <br />
          <br />
          Please select a course content from the right...
        </Typography>
      </Box>
    </Grid>
  );
};

export default DefaultIFramePage;
