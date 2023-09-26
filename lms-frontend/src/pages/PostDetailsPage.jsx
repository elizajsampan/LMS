import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingCircle from "../components/LoadingCircle";
import PostView from "../components/PostView";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { AuthContext } from "../context/auth/AuthContext";
import { PostsContext } from "../context/posts/PostsContext";
import { Container } from "@mui/system";
import { Box } from "@mui/material";

const PostDetailsPage = () => {
  const { authToken } = useContext(AuthContext);
  const params = useParams();
  const { fetchSelectedPost, loading, handleResetPost } =
    useContext(PostsContext);

  useEffect(() => {
    fetchSelectedPost(params.post_id);
    return () => {
      handleResetPost();
    };
  }, [fetchSelectedPost, params, handleResetPost]);

  if (loading) {
    return <LoadingCircle />;
  } else {
    return (
      <>
        {" "}
        <Box bgcolor="gray">
          {authToken ? <NavbarLoggedIn /> : <Navbar />}
          <Container sx={{ marginTop: 3, marginBottom: 3 }}>
            <PostView />
          </Container>
          <Footer />
        </Box>
      </>
    );
  }
};

export default PostDetailsPage;
