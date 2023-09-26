import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth/AuthContext";
import { CommentsProvider } from "./context/comments/CommentsContext";
import { ContentsProvider } from "./context/contents/ContentsContext";
import { CoursesProvider } from "./context/courses/CoursesContext";
import { MyCoursesProvider } from "./context/mycourses/MyCoursesContext";
import { PostsProvider } from "./context/posts/PostsContext";
import { ThemeProvider } from "./context/theme/ThemeContext";
import { UserProvider } from "./context/user/UserContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <MyCoursesProvider>
              <ContentsProvider>
                <CoursesProvider>
                  <CommentsProvider>
                    <PostsProvider>
                      <App />
                    </PostsProvider>
                  </CommentsProvider>
                </CoursesProvider>
              </ContentsProvider>
            </MyCoursesProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
