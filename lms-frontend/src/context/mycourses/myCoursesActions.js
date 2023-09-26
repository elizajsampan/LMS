import MyCoursesActionTypes from "./myCoursesActionTypes";

export const getMyCourses = (myCourses) => ({
  type: MyCoursesActionTypes.GET_MY_COURSES,
  payload: myCourses,
});

export const addToMyCourses = (song) => ({
  type: MyCoursesActionTypes.ADD_TO_MY_COURSES,
  payload: song,
});

export const removeFromMyCourses = () => ({
  type: MyCoursesActionTypes.REMOVE_FROM_MY_COURSES,
});

export const resetMyCourses = () => ({
  type: MyCoursesActionTypes.RESET_MY_COURSES,
});
