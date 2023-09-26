import PostsActionTypes from "./postsActionTypes";

export const addPost = (
  userData,
  id,
  value,
  photo,
  likedByCurrentUser,
  likesCount,
  commentsCount,
  comments
) => ({
  type: PostsActionTypes.ADD_POST,
  payload: {
    userData,
    id,
    value,
    photo,
    likedByCurrentUser,
    likesCount,
    commentsCount,
    comments,
  },
});

export const editPost = (id, updatedPost) => ({
  type: PostsActionTypes.EDIT_POST,
  payload: {
    id,
    updatedPost,
  },
});

export const deletePostStart = (postIdToDelete) => ({
  type: PostsActionTypes.DELETE_POST_START,
  payload: postIdToDelete,
});

export const deletePostFinish = (postIdToDelete) => ({
  type: PostsActionTypes.DELETE_POST_FINISH,
});

export const deletePostCancel = (postIdToDelete) => ({
  type: PostsActionTypes.DELETE_POST_CANCEL,
});

export const setPosts = (posts) => ({
  type: PostsActionTypes.SET_POSTS,
  payload: posts,
});

export const setUserInfo = (postId) => ({
  type: PostsActionTypes.SET_USERINFO,
  payload: postId,
});

export const setPostsUser = (postsUser) => ({
  type: PostsActionTypes.SET_POSTS_USER,
  payload: postsUser,
});

export const setSelectedPost = (selectedPost) => ({
  type: PostsActionTypes.SET_SELECTED_POST,
  payload: selectedPost,
});
export const resetSelectedPost = () => ({
  type: PostsActionTypes.RESET_SELECTED_POST,
});

export const resetPosts = () => ({
  type: PostsActionTypes.RESET_POSTS,
});

export const resetFilteredPosts = () => ({
  type: PostsActionTypes.RESET_FILTERED_POSTS,
});
