import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import useHttp from "../../hooks/useHttp";
import { AuthContext } from "../auth/AuthContext";
import {
  addComment,
  setComments,
  deleteCommentCancel,
  deleteCommentFinish,
  deleteCommentStart,
  resetComments,
} from "./commentsActions";
import commentsReducer from "./commentsReducer";

export const CommentsContext = createContext({
  fetchAllCommentsByPostId: () => {},
  comments: [],
  handleAddComment: () => {},
  handleDeleteCommentStart: () => {},
  handleDeleteCommentConfirmationModalClose: () => {},
  handleResetComments: () => {},
  postId: null,
  commentIdToDelete: null,
  showDeleteCommentConfirmationModal: false,
  selectedComment: null,
  loading: false,
  selectedCommentNotFound: false,
  unexpectedError: false,
  comment: null,
  // fetchComments: () => {},
});

export const CommentsProvider = ({ children }) => {
  const initialState = {
    comments: [],
    commentIdToDelete: null,
    showDeleteCommentConfirmationModal: false,
    postId: null,
  };
  const http = useHttp("http://localhost:8080/api");
  const [
    { comments, commentIdToDelete, showDeleteCommentConfirmationModal, postId },
    dispatch,
  ] = useReducer(commentsReducer, initialState);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const fetchAllCommentsByPostId = useCallback(
    async (postId) => {
      const response = await http.get(`/posts/${postId}/comments`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(setComments(response.data));
    },
    [http, authToken]
  );

  // const fetchComments = useCallback(
  //   async (commentId) => {
  //     const { data: comments } = await http.get(`comment/${commentId}`, {
  //       headers: {
  //         Authorization: authToken ? `Bearer ${authToken}` : "",
  //       },
  //     });
  //     dispatch(setComments(comments));
  //   },
  //   [http, authToken]
  // );

  const handleAddComment = async ({
    commentId,
    commentContent,
    userId,
    postId,
  }) => {
    const resp = await http.post(
      `/posts/${postId}/comments`,
      { commentId, commentContent, userId, postId },
      {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      }
    );
    dispatch(addComment(resp.data));
    window.location.reload();
  };

  const handleDeleteCommentConfirmationModalClose = async (
    toContinueDeleting
  ) => {
    console.log(postId, commentIdToDelete, toContinueDeleting);
    if (toContinueDeleting) {
      const response = await http.delete(
        `/posts/${postId}/comments/${commentIdToDelete}`,
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        }
      );
      console.log(response.data);
      dispatch(deleteCommentFinish());
    } else {
      dispatch(deleteCommentCancel());
    }
  };

  const handleDeleteCommentStart = (postId, commentIdToDelete) => {
    console.log(postId, commentIdToDelete);
    dispatch(deleteCommentStart(postId, commentIdToDelete));
  };

  const handleResetComments = useCallback(() => {
    dispatch(resetComments());
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        fetchAllCommentsByPostId,
        // fetchComments,
        postId,
        handleAddComment,
        handleDeleteCommentStart,
        handleDeleteCommentConfirmationModalClose,
        showDeleteCommentConfirmationModal,
        comments,
        commentIdToDelete,
        handleResetComments,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
