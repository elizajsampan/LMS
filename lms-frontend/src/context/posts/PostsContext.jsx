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
  setPosts,
  setPostsUser,
  setUserInfo,
  resetPosts,
  deletePostCancel,
  deletePostFinish,
  deletePostStart,
  editPost,
  addPost,
  resetFilteredPosts,
  setSelectedPost,
} from "./postsActions";
import postsReducer from "./postsReducer";

export const PostsContext = createContext({
  fetchAllPosts: () => {},
  fetchAllPostsUser: () => {},
  posts: [],
  postsUser: [],
  handleResetPosts: () => {},
  handleResetPost: () => {},
  handleAddPost: () => {},
  handleEdit: () => {},
  handleDeletePostStart: () => {},
  handleDeletePostConfirmationModalClose: () => {},
  postIdToDelete: null,
  showDeletePostConfirmationModal: false,
  selectedPost: null,
  fetchFilteredPosts: () => {},
  fetchSelectedPost: () => {},
  fetchUserByPost: () => {},
  loading: false,
  selectedPostNotFound: false,
  unexpectedError: false,
  filteredPosts: null,
  handleResetFilteredPosts: () => {},
  post: null,
});

export const PostsProvider = ({ children }) => {
  const initialState = {
    posts: [],
    postIdToDelete: null,
    showDeletePostConfirmationModal: false,
    post: null,
    postsUser: [],
    selectedPost: null,
  };
  const [filteredPosts, setFilteredPosts] = useState(null);
  const http = useHttp("http://localhost:8080/api");

  const [
    {
      posts,
      postIdToDelete,
      showDeletePostConfirmationModal,
      postsUser,
      selectedPost,
    },
    dispatch,
  ] = useReducer(postsReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [selectedPostNotFound, setSelectedPostNotFound] = useState(false);
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [post, setPost] = useState(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const fetchAllPosts = useCallback(async () => {
    setLoading(true);
    const response = await http.get("/posts");
    dispatch(setPosts(response.data));
  }, [http]);

  const fetchAllPostsUser = useCallback(async () => {
    setLoading(true);
    const response = await http.get("/posts/user", {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });

    dispatch(setPostsUser(response.data));
  }, [http, authToken]);

  const fetchUserByPost = useCallback(
    async ({ postId }) => {
      try {
        const formData = new FormData();
        formData.append("postId", postId);
        const { data: post } = await http.get("/posts/info", formData, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });
        dispatch(setUserInfo(post));
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          error.response.status === 404;

        if (expectedError) {
          setSelectedPostNotFound(true);
        } else {
          setUnexpectedError(true);
        }
      }
    },
    [http, authToken]
  );

  const fetchSelectedPost = useCallback(
    async (post_id) => {
      setLoading(true);
      try {
        const response = await http.get(`/posts/${post_id}`, {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        });
        dispatch(setSelectedPost(response.data));
      } catch (error) {
        const expectedError =
          error.response &&
          error.response.data &&
          error.response.status === 404;

        if (expectedError) {
          setSelectedPostNotFound(true);
        } else {
          setUnexpectedError(true);
        }
      }
      setLoading(false);
    },
    [http, authToken]
  );

  const handleDeletePostStart = (postIdToDelete) => {
    dispatch(deletePostStart(postIdToDelete));
  };

  const handleDeletePostConfirmationModalClose = async (toContinueDeleting) => {
    if (toContinueDeleting) {
      await http.delete(`/posts/delete/${postIdToDelete}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      });
      dispatch(deletePostFinish());
    } else {
      dispatch(deletePostCancel());
    }
  };

  const handleResetPost = useCallback(() => {
    setPost(null);
    setUnexpectedError(false);
    setSelectedPostNotFound(false);
  }, []);

  const handleResetPosts = useCallback(() => {
    dispatch(resetPosts());
  }, []);

  const handleEdit = useCallback(
    async (id, { id: _id, ...updatedPost }) => {
      const { data: updatedPostInDb } = await http.patch(
        `/post/${id}`,
        {
          ...updatedPost,
        },
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        }
      );
      dispatch(editPost(id, updatedPostInDb));
    },
    [http, authToken]
  );

  const handleAddPost = async ({ userId, postId, postContent, photo }) => {
    const formData = new FormData();

    formData.append(
      "post",
      JSON.stringify({
        userId,
        postId,
        postContent,
      })
    );
    if (photo) {
      formData.append("image", photo);
    }
    const { data: addedPost } = await http.post("/posts/new", formData, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    dispatch(addPost(addedPost));
    window.location.reload();
  };

  const fetchFilteredPosts = async () => {
    await fetch(`http://localhost:8080/api/profile/posts/me`, {
      method: "GET",
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!filteredPosts) setFilteredPosts(data);
      })
      .catch((error) => console.log(error));
  };

  const handleResetFilteredPosts = useCallback(() => {
    dispatch(resetFilteredPosts());
  }, []);

  return (
    <PostsContext.Provider
      value={{
        fetchAllPosts,
        fetchAllPostsUser,
        posts,
        postsUser,
        selectedPost,
        handleResetPost,
        handleResetPosts,
        handleAddPost,
        fetchSelectedPost,
        fetchUserByPost,
        handleDeletePostConfirmationModalClose,
        handleDeletePostStart,
        handleEdit,
        postIdToDelete,
        showDeletePostConfirmationModal,
        post,
        loading,
        unexpectedError,
        selectedPostNotFound,
        fetchFilteredPosts,
        filteredPosts,
        handleResetFilteredPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
