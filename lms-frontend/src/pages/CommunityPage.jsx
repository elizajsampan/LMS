import { useContext, useEffect } from "react";
import AddPost from "../components/AddPost";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import PostStack from "../components/PostStack";
import { AuthContext } from "../context/auth/AuthContext";
import { PostsContext } from "../context/posts/PostsContext";
import CommunityLoggedOutView from "../components/CommunityLoggedOutView";
import image from "../assets/community.jpg";
import { Box, Grid } from "@mui/material";

const CommunityPage = () => {
  const { authToken } = useContext(AuthContext);
  const { fetchAllPostsUser, handleResetPosts } = useContext(PostsContext);

  useEffect(() => {
    fetchAllPostsUser();
    return () => {
      handleResetPosts();
    };
  }, [fetchAllPostsUser, handleResetPosts]);

  if (authToken) {
    return (
      <>
        <NavbarLoggedIn />
        <Grid
          container
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              ml: 30,
              mt: 5,
            }}
          >
            <AddPost />
            <PostStack />
          </Box>
        </Grid>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <CommunityLoggedOutView />
      </>
    );
  }
};

export default CommunityPage;
