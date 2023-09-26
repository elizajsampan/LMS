import PostsActionTypes from "./postsActionTypes";

const postsReducer = (state, action) => {
  switch (action.type) {
    case PostsActionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case PostsActionTypes.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload.updatedPost : post
        ),
      };
    case PostsActionTypes.DELETE_POST_START:
      return {
        ...state,
        postIdToDelete: action.payload,
        showDeletePostConfirmationModal: true,
      };
    case PostsActionTypes.DELETE_POST_FINISH:
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post.post_id !== state.postIdToDelete
        ),
        postIdToDelete: null,
        showDeletePostConfirmationModal: false,
      };
    case PostsActionTypes.DELETE_POST_CANCEL:
      return {
        ...state,
        postIdToDelete: null,
        showDeletePostConfirmationModal: false,
      };
    case PostsActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case PostsActionTypes.SET_USERINFO: {
      return {
        ...state,
        postId: action.payload,
      };
    }
    case PostsActionTypes.SET_POSTS_USER: {
      return {
        ...state,
        postsUser: action.payload,
      };
    }
    case PostsActionTypes.SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };
    case PostsActionTypes.RESET_SELECTED_POST:
      return {
        ...state,
        selectedPost: null,
      };
    case PostsActionTypes.RESET_POSTS:
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
};

export default postsReducer;
