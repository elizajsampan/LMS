import { createContext, useContext, useEffect } from "react";
import {
  getMyCourses,
  addToMyCourses,
  removeFromMyCourses,
  resetMyCourses,
} from "./myCoursesActions";
import myCoursesReducer from "./myCoursesReducer";
import useHttp from "../../hooks/useHttp";
import { useReducer } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useCallback } from "react";

export const MyCoursesContext = createContext({
  myCourses: [],
  fetchMyCourses: () => {},
  handleAddToMyCourses: () => {},
  handleRemoveFromMyCourses: () => {},
  handleResetMyCourses: () => {},
  showDeleteConfirmationModal: false,
  loading: false,
});

export const MyCoursesProvider = ({ children }) => {
  const initialState = {
    myCourses: [],
    myCourseIdToDelete: null,
    myCourseUserId: null,
    showDeleteConfirmationModal: false,
  };

  const [
    // { myCourses, myCourseIdToDelete, showDeleteConfirmationModal },
    { myCourses },
    dispatch,
  ] = useReducer(myCoursesReducer, initialState);

  useEffect(() => {
    if (myCourses) {
      localStorage.setItem("myCourses", JSON.stringify(myCourses));
    } else
      dispatch(getMyCourses(JSON.parse(localStorage.getItem("myCourses"))));
  }, [myCourses]);

  const http = useHttp();
  const { authToken } = useContext(AuthContext);
  // const [loading, setLoading] = useState(false);

  const fetchMyCourses = useCallback(async () => {
    if (authToken) {
      const resp = await http.get("/mycourses", {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(getMyCourses(resp.data));
    }
  }, [http, authToken]);

  const handleAddToMyCourses = useCallback(
    async (course) => {
      const { data: addedCourse } = await http.post(
        "/mycourses/enroll",
        course,
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        }
      );
      dispatch(addToMyCourses(addedCourse));
    },
    [http, authToken]
  );

  const handleRemoveFromMyCourses = async (myCourseIdToDelete) => {
    await http.delete(`/mycourses/remove/${myCourseIdToDelete}`, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(removeFromMyCourses());
  };

  const handleResetCourse = async () => {
    await http.delete("/mycourses/remove", {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(removeFromMyCourses());
  };

  const handleResetMyCourses = async () => {
    dispatch(resetMyCourses());
  };

  return (
    <MyCoursesContext.Provider
      value={{
        myCourses,
        fetchMyCourses,
        handleAddToMyCourses,
        handleResetMyCourses,
        handleRemoveFromMyCourses,
        handleResetCourse,
      }}
    >
      {children}
    </MyCoursesContext.Provider>
  );
};
