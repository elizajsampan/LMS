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
  setContents,
  resetContents,
  deleteContentCancel,
  deleteContentFinish,
  deleteContentStart,
  editContent,
  addContent,
  resetFilteredContents,
  setSelectedContent,
  resetSelectedContent,
} from "./contentsActions";
import ContentsReducer from "./contentsReducer";

export const ContentsContext = createContext({
  fetchAllContents: () => {},
  contents: [],
  handleResetContents: () => {},
  handleResetSelectedContent: () => {},
  handleAddContent: () => {},
  handleEditContent: () => {},
  handleDeleteContentStart: () => {},
  handleDeleteContentConfirmationModalClose: () => {},
  contentIdToDelete: null,
  showDeleteContentConfirmationModal: false,
  selectedContent: null,
  fetchFilteredContents: () => {},
  fetchSelectedContent: () => {},
  loading: false,
  selectedContentNotFound: false,
  unexpectedError: false,
  filteredContents: null,
  handleResetFilteredContents: () => {},
});

export const ContentsProvider = ({ children }) => {
  const initialState = {
    contents: [],
    contentIdToDelete: null,
    showDeleteContentConfirmationModal: false,
    selectedContent: null,
  };
  const [filteredContents, setFilteredContents] = useState(null);
  const http = useHttp();

  const [
    {
      contents,
      contentIdToDelete,
      showDeleteContentConfirmationModal,
      selectedContent,
    },
    dispatch,
  ] = useReducer(ContentsReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [selectedContentNotFound, setSelectedContentNotFound] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    if (contents) {
      localStorage.setItem("contents", JSON.stringify(contents));
    } else dispatch(setContents(JSON.parse(localStorage.getItem("contents"))));
  }, [contents]);

  const fetchAllContents = useCallback(async () => {
    setLoading(true);
    const response = await http.get("/content", {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(setContents(response.data));
  }, [http, authToken]);

  const fetchSelectedContent = useCallback(
    async (contentId) => {
      setLoading(true);
      try {
        const { data: content } = await http.get(`/content/${contentId}`, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });
        dispatch(setSelectedContent(content));
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          error.response.status === 404;

        if (expectedError) {
          setSelectedContentNotFound(true);
        } else {
          setUnexpectedError(true);
        }
      }
      setLoading(false);
    },
    [http, authToken]
  );

  const handleDeleteContentConfirmationModalClose = async (
    toContinueDeleting
  ) => {
    if (toContinueDeleting) {
      await http.delete(`/content/delete/${contentIdToDelete}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(deleteContentFinish());
    } else {
      dispatch(deleteContentCancel());
    }
  };

  const handleResetSelectedContent = useCallback(() => {
    dispatch(resetSelectedContent());
    setUnexpectedError(false);
    setSelectedContentNotFound(false);
  }, []);

  const handleResetContents = useCallback(() => {
    dispatch(resetContents());
  }, []);

  const handleDeleteContentStart = (id) => {
    dispatch(deleteContentStart(id));
  };

  const handleEditContent = useCallback(
    async (
      contentIdGenerated,
      { contentId, courseId, contentTitle, videoContent, lessonNum, image }
    ) => {
      const formData = new FormData();
      formData.append(
        "content",
        JSON.stringify({
          contentId,
          courseId,
          contentTitle,
          videoContent,
          lessonNum,
        })
      );
      if (image) {
        formData.append("image", image);
      }
      const { data: updatedContentInDb } = await http.patch(
        `/content/${contentIdGenerated}`,
        formData,
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        }
      );
      dispatch(editContent(contentIdGenerated, updatedContentInDb));
    },
    [http, authToken]
  );

  const handleAddContent = async ({
    contentId,
    courseId,
    contentTitle,
    videoContent,
    lessonNum,
  }) => {
    const formData = new FormData();
    formData.append(
      "content",
      JSON.stringify({
        contentId,
        courseId,
        contentTitle,
        videoContent,
        lessonNum,
      })
    );
    const resp = await http.post("/content/add", formData, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(addContent(resp.data));
  };

  const fetchFilteredContents = async (username) => {
    await fetch(`http://localhost:8080/api/profiles/${username}/contents`, {
      method: "GET",
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!filteredContents) setFilteredContents(data);
      })
      .catch((error) => console.log(error));
  };

  const handleResetFilteredContents = useCallback(() => {
    dispatch(resetFilteredContents());
  }, []);

  return (
    <ContentsContext.Provider
      value={{
        fetchAllContents,
        contents,
        handleResetSelectedContent,
        handleResetContents,
        handleAddContent,
        fetchSelectedContent,
        handleDeleteContentConfirmationModalClose,
        handleDeleteContentStart,
        handleEditContent,
        contentIdToDelete,
        showDeleteContentConfirmationModal,
        loading,
        unexpectedError,
        selectedContentNotFound,
        selectedContent,
        fetchFilteredContents,
        filteredContents,
        handleResetFilteredContents,
      }}
    >
      {children}
    </ContentsContext.Provider>
  );
};
