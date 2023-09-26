import AuthActionTypes from "./authActionTypes";

export const setAuthToken = (authToken) => ({
  type: AuthActionTypes.SET_AUTH_TOKEN,
  payload: authToken,
});

export const setUserData = (userData) => ({
  type: AuthActionTypes.SET_USER_DATA,
  payload: userData,
});

export const editUserData = (userData) => {
  return {
    type: AuthActionTypes.EDIT_USER_DATA,
    payload: userData,
  };
};
