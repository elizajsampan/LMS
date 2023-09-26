import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../auth/AuthContext";
import {
  addCourse,
  deleteCourseCancel,
  deleteCourseFinish,
  deleteCourseStart,
  editCourse,
  resetCourses,
  resetFilteredCourses,
  resetSelectedCourse,
  resetSelectedCourseContents,
  setCourses,
  setFilteredCourses,
  setSelectedCourse,
  setSelectedCourseContents,
} from "./coursesActions";
import coursesReducer from "./coursesReducer";

export const CoursesContext = createContext({
  fetchAllCourses: () => {},
  courses: [],
  handleResetCourses: () => {},
  handleResetCourse: () => {},
  handleAddCourse: () => {},
  handleEditCourse: () => {},
  handleDeleteCourseStart: () => {},
  handleDeleteCourseConfirmationModalClose: () => {},
  courseIdToDelete: null,
  showDeleteCourseConfirmationModal: false,
  selectedCourse: null,
  fetchFilteredCourses: () => {},
  fetchSelectedCourse: () => {},
  loading: false,
  selectedCourseNotFound: false,
  unexpectedError: false,
  filteredCourses: [],
  handleResetFilteredCourses: () => {},
  handleResetSelectedCourse: () => {},
  fetchSelectedCourseContents: () => {},
  handleResetSelectedCourseContents: () => {},
  selectedCourseContents: [],
});

export const CoursesProvider = ({ children }) => {
  const initialState = {
    courses: [],
    courseIdToDelete: null,
    showDeleteCourseConfirmationModal: false,
    course: null,
    selectedCourse: null,
    selectedCourseContents: [],
    filteredCourses: [],
  };
  const http = useHttp();

  const [
    {
      courses,
      course,
      courseIdToDelete,
      selectedCourse,
      showDeleteCourseConfirmationModal,
      selectedCourseContents,
      filteredCourses,
    },
    dispatch,
  ] = useReducer(coursesReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [selectedCourseNotFound, setSelectedCourseNotFound] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (courses) {
      localStorage.setItem("courses", JSON.stringify(courses));
    } else dispatch(setCourses(JSON.parse(localStorage.getItem("courses"))));
  }, [courses]);

  const fetchAllCourses = useCallback(async () => {
    setLoading(true);
    const response = await http.get("/courses", {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(setCourses(response.data));
  }, [http, authToken]);

  const fetchSelectedCourse = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const resp = await http.get(`/courses/id/${id}`, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });
        dispatch(setSelectedCourse(resp.data));
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          error.response.status === 404;

        if (expectedError) {
          setSelectedCourseNotFound(true);
        } else {
          setUnexpectedError(true);
        }
      }
      setLoading(false);
    },
    [http, authToken]
  );

  const fetchSelectedCourseContents = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const resp = await http.get(`/courses/content/id/${id}`, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });
        dispatch(setSelectedCourseContents(resp.data));
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          error.response.status === 404;

        if (expectedError) {
          setSelectedCourseNotFound(true);
        } else {
          setUnexpectedError(true);
        }
      }
      setLoading(false);
    },
    [http, authToken]
  );

  const handleDeleteCourseConfirmationModalClose = async (
    toContinueDeleting
  ) => {
    if (toContinueDeleting) {
      await http.delete(`/courses/delete/${courseIdToDelete}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(deleteCourseFinish());
    } else {
      dispatch(deleteCourseCancel());
    }
  };

  const handleResetSelectedCourse = useCallback(() => {
    dispatch(resetSelectedCourse());
    setUnexpectedError(false);
    setSelectedCourseNotFound(false);
  }, []);
  const handleResetSelectedCourseContents = useCallback(() => {
    dispatch(resetSelectedCourseContents());
    setUnexpectedError(false);
    setSelectedCourseNotFound(false);
  }, []);

  const handleResetCourses = useCallback(() => {
    dispatch(resetCourses());
  }, []);

  const handleDeleteCourseStart = (id) => {
    dispatch(deleteCourseStart(id));
    console.log(showDeleteCourseConfirmationModal);
    console.log(courseIdToDelete);
  };

  const handleEditCourse = useCallback(
    async (courseIdGenerated, { courseId, courseName, description, image }) => {
      const formData = new FormData();
      formData.append(
        "course",
        JSON.stringify({
          courseId,
          courseName,
          description,
        })
      );
      if (image) {
        formData.append("image", image);
      }
      const { data: updatedCourseInDb } = await http.patch(
        `/courses/${courseIdGenerated}`,
        formData,
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        }
      );
      dispatch(editCourse(courseIdGenerated, updatedCourseInDb));
    },
    [http, authToken]
  );

  const handleAddCourse = async ({
    courseId,
    courseName,
    description,
    image,
  }) => {
    const formData = new FormData();
    formData.append(
      "course",
      JSON.stringify({
        courseId,
        courseName,
        description,
      })
    );
    if (image) {
      formData.append("image", image);
    }
    const resp = await http.post("/courses/new", formData, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(addCourse(resp.data));
  };

  const fetchFilteredCourses = useCallback(
    async (courseName) => {
      setLoading(true);
      const response = await http.get(`/courses/${courseName}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(setFilteredCourses(response.data));
    },
    [http, authToken]
  );

  const handleResetFilteredCourses = useCallback(() => {
    dispatch(resetFilteredCourses());
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        fetchAllCourses,
        courses,
        selectedCourse,
        handleResetSelectedCourse,
        handleResetCourses,
        handleAddCourse,
        fetchSelectedCourse,
        handleDeleteCourseConfirmationModalClose,
        handleDeleteCourseStart,
        handleEditCourse,
        courseIdToDelete,
        showDeleteCourseConfirmationModal,
        course,
        loading,
        unexpectedError,
        selectedCourseNotFound,
        fetchFilteredCourses,
        filteredCourses,
        handleResetFilteredCourses,
        fetchSelectedCourseContents,
        handleResetSelectedCourseContents,
        selectedCourseContents,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
