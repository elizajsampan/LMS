import UserActionTypes from "./userActionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case UserActionTypes.DELETE_USER_START:
      return {
        ...state,
        userIdToDelete: action.payload,
        showDeleteUserConfirmationModal: true,
      };
    case UserActionTypes.DELETE_USER_FINISH:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.user_id !== state.userIdToDelete
        ),
        userIdToDelete: null,
        showDeleteUserConfirmationModal: false,
      };
    case UserActionTypes.DELETE_USER_CANCEL:
      return {
        ...state,
        userIdToDelete: null,
        showDeleteUserConfirmationModal: false,
      };
    default:
      return state;
  }
};

export default userReducer;
