import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useCallback,
} from "react";
import authReducer from "./authReducer";
import useHttp from "../../hooks/useHttp";
import { editUserData, setAuthToken, setUserData } from "./authActions";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { MyCoursesContext } from "../mycourses/MyCoursesContext";

export const AuthContext = createContext({
  authToken: null,
  userData: null,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  fetchUserData: () => {},
  handleEditUserData: () => {},
  handleEditPassword: () => {},
  handleResetUserData: () => {},
});

export const AuthProvider = ({ children }) => {
  const initialState = {
    authToken: localStorage.getItem("authToken"),
    userData: null,
  };
  const { onShowToastNotification, onHideToastNotification } =
    useContext(ThemeContext);
  const { handleResetMyCourses } = useContext(MyCoursesContext);
  const [{ authToken, userData }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const navigate = useNavigate();
  const http = useHttp();

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else dispatch(setUserData(JSON.parse(localStorage.getItem("userData"))));
  }, [userData]);

  const fetchUserData = useCallback(async () => {
    if (authToken) {
      const response = await http.get("/me", {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(setUserData(response.data));
    }
  }, [http, authToken]);

  const signIn = useCallback(
    async ({ username, password }) => {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      try {
        const {
          data: { access_token },
        } = await http.post(`/login`, formData);
        localStorage.setItem("authToken", access_token);
        await dispatch(setAuthToken(access_token));
        if (access_token) {
          fetchUserData();
          onShowToastNotification({
            message: "Login successful",
            severity: "success",
          });
          navigate("/");
        }
      } catch (error) {
        onShowToastNotification({
          message: `Login failed with error: ${error.message}`,
          severity: "error",
        });
      }
      setTimeout(() => {
        onHideToastNotification();
      }, 6000);
    },
    [
      http,
      fetchUserData,
      navigate,
      onHideToastNotification,
      onShowToastNotification,
    ]
  );

  const signUp = async ({
    userId,
    username,
    password,
    firstName,
    lastName,
    email,
    role,
    image,
  }) => {
    const formData = new FormData();
    formData.append(
      "users",
      JSON.stringify({
        userId,
        username,
        password,
        firstName,
        lastName,
        email,
        role,
      })
    );
    if (image) {
      formData.append("image", image);
    }
    await http.post("/register", formData);
  };

  const handleResetUserData = useCallback(() => {
    dispatch(setUserData(null));
  }, []);

  const signOut = () => {
    dispatch(setAuthToken(null));
    handleResetUserData();
    handleResetMyCourses();
    localStorage.removeItem("users");
    localStorage.removeItem("authToken");
    localStorage.removeItem("myCourses");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleEditUserData = useCallback(
    async ({ firstName, lastName, username, email, image }) => {
      const formData = new FormData();
      formData.append(
        "users",
        JSON.stringify({
          username,
          firstName,
          lastName,
          email,
        })
      );
      if (image) {
        formData.append("image", image);
      }
      try {
        const { data: updatedUserInDb } = await http.patch(
          "/editprofile",
          formData,
          {
            headers: {
              Authorization: authToken ? `Bearer ${authToken}` : "",
            },
          }
        );
        dispatch(editUserData(updatedUserInDb));
        onShowToastNotification({
          message: "Profile updated",
          severity: "success",
        });
      } catch (error) {
        onShowToastNotification({
          message: "An error occured with error: " + error.message,
          severity: "error",
        });
      }
      setTimeout(() => {
        onHideToastNotification();
      }, 1000);
    },
    [http, authToken, onShowToastNotification, onHideToastNotification]
  );

  const handleEditPassword = useCallback(
    async ({ password }) => {
      try {
        const { data: updatedUserInDb } = await http.patch(
          "/editpassword",
          {
            password,
          },
          {
            headers: {
              Authorization: authToken ? `Bearer ${authToken}` : "",
            },
          }
        );
        dispatch(setUserData(updatedUserInDb));
        onShowToastNotification({
          message: "Password updated",
          severity: "success",
        });
      } catch (error) {
        onShowToastNotification({
          message: "An error occured with error: " + error.message,
          severity: "error",
        });
      }
      setTimeout(() => {
        onHideToastNotification();
      }, 1000);
    },
    [http, authToken, onShowToastNotification, onHideToastNotification]
  );

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userData,
        handleEditUserData,
        handleEditPassword,
        signIn,
        signUp,
        signOut,
        fetchUserData,
        handleResetUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
