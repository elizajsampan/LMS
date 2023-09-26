import AuthActionTypes from "./authActionTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case AuthActionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case AuthActionTypes.EDIT_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
