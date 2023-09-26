import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { ThemeContext } from "./context/theme/ThemeContext";
import { useContext } from "react";
import RegistrationPage from "./pages/RegistrationPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LearnPage from "./pages/LearnPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CommunityPage from "./pages/CommunityPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import ToastNotification from "./components/ToastNotification";
import { AuthContext } from "./context/auth/AuthContext";
import EditProfilePage from "./pages/EditProfilePage";
import ContentsPage from "./pages/ContentsPage";
import AddCoursePage from "./pages/AddCoursePage";
import AddContentPage from "./pages/AddContentPage";
import CoursesPage from "./pages/CoursesPage";
import EditCoursePage from "./pages/EditCoursePage";
import EditContentPage from "./pages/EditContentPage";
import DeleteCourseConfirmationModal from "./components/DeleteCourseConfirmationModal";
import DeleteContentConfirmationModal from "./components/DeleteContentConfirmationModal";
import ProfileSecurityPage from "./pages/ProfileSecurityPage";
import LearnCoursePage from "./pages/LearnCoursePage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import DefaultIFramePage from "./pages/DefaultIframePage";
import PostDetailsPage from "./pages/PostDetailsPage";
import DeletePostConfirmationModal from "./components/DeletePostConfirmationModal";
import DeleteCommentConfirmationModal from "./components/DeleteCommentConfirmationModal";
import DeleteUserConfirmationModal from "./components/DeleteUserConfirmationModal";
import UsersPage from "./pages/UsersPage";

function App() {
  const { theme } = useContext(ThemeContext);
  const { userData } = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item xs={12}>
        <ToastNotification />
      </Grid>
      <Grid item xs={12}>
        <DeleteCourseConfirmationModal />
      </Grid>
      <Grid item xs={12}>
        <DeleteContentConfirmationModal />
      </Grid>
      <Grid item xs={12}>
        <DeletePostConfirmationModal />
      </Grid>
      <Grid item xs={12}>
        <DeleteCommentConfirmationModal />
      </Grid>
      <Grid item xs={12}>
        <DeleteUserConfirmationModal />
      </Grid>
      <Routes>
        {userData ? (
          userData.role === "admin" ? (
            <>
              <Route path="/" element={<AdminPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/posts/:post_id" element={<PostDetailsPage />} />
              <Route
                path="/edit-profile/profile"
                element={<EditProfilePage />}
              />
              <Route path="/course" element={<CoursesPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route
                path="/edit-profile/profile"
                element={<EditProfilePage />}
              />
              <Route
                path="/edit-profile/security"
                element={<ProfileSecurityPage />}
              />
              <Route path="/content" element={<ContentsPage />} />
              <Route path="/user" element={<UsersPage />} />
              <Route path="/add-course" element={<AddCoursePage />} />
              <Route path="/add-content" element={<AddContentPage />} />
              <Route
                path="/edit-course/:courseId"
                element={<EditCoursePage />}
              />
              <Route
                path="/edit-content/:contentId"
                element={<EditContentPage />}
              />
              <Route
                path="/course/id/:courseId"
                element={<CourseDetailsPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<UserPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/posts/:post_id" element={<PostDetailsPage />} />
              <Route
                path="/edit-profile/profile"
                element={<EditProfilePage />}
              />
              <Route
                path="/edit-profile/security"
                element={<ProfileSecurityPage />}
              />
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route
                path="/course/learn/:courseId"
                element={<LearnCoursePage />}
              />
              <Route
                path="/course/id/:courseId"
                element={<CourseDetailsPage />}
              />
              <Route path="/course/iframe" element={<DefaultIFramePage />} />
              <Route path="/edit-profile" element={<EditProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          )
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/course/id/:courseId"
              element={<CourseDetailsPage />}
            />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/posts/:post_id" element={<PostDetailsPage />} />
            <Route path="/edit-profile/profile" element={<EditProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
