import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import bgImage from "../assets/retrosupply-jLwVAUtLOAQ-unsplash.jpg";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Introduction = ({ handleClick }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      mt={-3}
    >
      <Container>
        <Grid
          container
          item
          xs={12}
          md={7}
          lg={6}
          flexDirection="column"
          justifyContent="center"
        >
          <Typography
            variant="h1"
            color="white"
            mb={3}
            mt={-3}
            sx={({ breakpoints }) => ({
              [breakpoints.down("md")]: {
                fontSize: 100,
              },
            })}
          >
            LEARN ANY PROGRAMMING LANGUAGE
          </Typography>
          <Typography
            variant="body1"
            color="white"
            opacity={0.8}
            pr={6}
            mr={6}
            sx={{ fontStyle: "italic" }}
          >
            "An investment in knowledge pays the best interest."
            <br />- Benjamin Franklin
          </Typography>
          <Stack direction="row" spacing={3} mt={3}>
            <Button
              sx={{
                bgcolor: "white",
                color: "black",
                ":hover": { backgroundColor: grey[500] },
              }}
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button
              sx={{
                color: "white",
                bgcolor: "transparent",
              }}
              onClick={handleClick}
              variant="contained"
            >
              Read more
            </Button>
          </Stack>
        </Grid>
      </Container>
    </Box>
  );
};

export default Introduction;
