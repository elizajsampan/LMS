import { Container } from "@mui/system";
import { useContext, useEffect } from "react";
import AddPost from "../components/AddPost";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import PostStack from "../components/PostStack";
import { AuthContext } from "../context/auth/AuthContext";
import { PostsContext } from "../context/posts/PostsContext";

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
        <Container sx={{ marginTop: 5, marginBottom: 3 }}>
          <AddPost />
          <PostStack />
        </Container>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <Container sx={{ marginTop: 5, marginBottom: 3 }}>
          <PostStack />
        </Container>
        <Footer />
      </>
    );
  }
};

export default CommunityPage;
