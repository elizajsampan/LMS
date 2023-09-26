import CommentsActionTypes from "./commentsActionTypes";

const commentsReducer = (state, action) => {
  switch (action.type) {
    case CommentsActionTypes.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case CommentsActionTypes.ADD_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case CommentsActionTypes.DELETE_COMMENT_START:
      return {
        ...state,
        postId: action.payload[0],
        commentIdToDelete: action.payload[1],
        showDeleteCommentConfirmationModal: true,
      };
    case CommentsActionTypes.DELETE_COMMENT_FINISH:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) =>
            comment.comment_id !== state.commentIdToDelete &&
            comment.post_id !== state.postId
        ),
        postId: null,
        commentIdToDelete: null,
        showDeleteCommentConfirmationModal: false,
      };
    case CommentsActionTypes.DELETE_COMMENT_CANCEL:
      return {
        ...state,
        commentIdToDelete: null,
        postId: null,
        showDeleteCommentConfirmationModal: false,
      };
    default:
      return state;
  }
};

export default commentsReducer;
