import CommentsActionTypes from "./commentsActionTypes";

export const setComments = (comments) => ({
  type: CommentsActionTypes.SET_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: CommentsActionTypes.ADD_COMMENT,
  payload: comment,
});

export const deleteCommentStart = (postId, commentIdToDelete) => ({
  type: CommentsActionTypes.DELETE_COMMENT_START,
  payload: [postId, commentIdToDelete],
});

export const deleteCommentFinish = (commentIdToDelete) => ({
  type: CommentsActionTypes.DELETE_COMMENT_FINISH,
});

export const deleteCommentCancel = (commentIdToDelete) => ({
  type: CommentsActionTypes.DELETE_COMMENT_CANCEL,
});

export const resetComments = () => ({
  type: CommentsActionTypes.RESET_COMMENTS,
});
