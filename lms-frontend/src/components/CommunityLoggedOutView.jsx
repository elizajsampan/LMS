import { Box, Grid, Container } from "@mui/material";
import { useContext, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PostStack from "./PostStack";
import { PostsContext } from "../context/posts/PostsContext";
import image from "../assets/community.jpg";

const CommunityPage = () => {
  const { fetchAllPostsUser, handleResetPosts } = useContext(PostsContext);

  useEffect(() => {
    fetchAllPostsUser();
    return () => {
      handleResetPosts();
    };
  }, [fetchAllPostsUser, handleResetPosts]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          mb: -3,
        }}
      >
        <Container
          sx={{
            marginTop: 5,
            marginBottom: 3,
            mx: 25,
          }}
        >
          <Grid container spacing={10}>
            <Grid item xs={8}>
              <PostStack />
            </Grid>
            {/* <Grid item xs={4} justifyContent="flex-end">
              <Box
                sx={{
                  p: 2,
                  border: "1px dashed grey",
                  height: 300,
                }}
              >
                <Typography>Groups to Join:</Typography>
              </Box>
              <Box position="fixed" sx={{ mt: 30, ml: 3 }}>
                <Button onClick={() => navigate("/login")} variant="contained">
                  <ForumIcon /> Join the Community / Sign In
                </Button>
              </Box>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default CommunityPage;
