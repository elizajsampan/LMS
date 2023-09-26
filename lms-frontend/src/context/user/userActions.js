import UserActionTypes from "./userActionTypes";

export const setUsers = (users) => ({
  type: UserActionTypes.SET_USERS,
  payload: users,
});

export const deleteUserStart = (userIdToDelete) => ({
  type: UserActionTypes.DELETE_USER_START,
  payload: userIdToDelete,
});

export const deleteUserFinish = () => ({
  type: UserActionTypes.DELETE_USER_FINISH,
});

export const deleteUserCancel = () => ({
  type: UserActionTypes.DELETE_USER_CANCEL,
});
