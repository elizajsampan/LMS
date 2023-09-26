import { Grid } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentForm from "../components/ContentForm";
import Footer from "../components/Footer";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { ContentsContext } from "../context/contents/ContentsContext";

const EditContentPage = () => {
  const { fetchSelectedContent, handleResetSelectedContent, selectedContent } =
    useContext(ContentsContext);

  const { contentId } = useParams();

  useEffect(() => {
    fetchSelectedContent(contentId);
    return () => {
      handleResetSelectedContent();
    };
  }, [fetchSelectedContent, handleResetSelectedContent, contentId]);

  if (!selectedContent) {
    return null;
  }
  return (
    <Grid>
      <NavbarLoggedIn />
      <ContentForm initialFormValue={selectedContent} />
      <Footer />
    </Grid>
  );
};

export default EditContentPage;
