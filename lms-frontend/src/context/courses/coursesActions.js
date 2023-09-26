import coursesActionTypes from "./coursesActionTypes";

export const addCourse = (course) => ({
  type: coursesActionTypes.ADD_COURSE,
  payload: course,
});

export const editCourse = (course_id, updatedCourse) => ({
  type: coursesActionTypes.EDIT_COURSE,
  payload: {
    course_id,
    updatedCourse,
  },
});

export const deleteCourseStart = (courseId) => ({
  type: coursesActionTypes.DELETE_COURSE_START,
  payload: courseId,
});

export const deleteCourseFinish = () => ({
  type: coursesActionTypes.DELETE_COURSE_FINISH,
});

export const deleteCourseCancel = () => ({
  type: coursesActionTypes.DELETE_COURSE_CANCEL,
});

export const setCourses = (courses) => ({
  type: coursesActionTypes.SET_COURSES,
  payload: courses,
});

export const setFilteredCourses = (filteredCourses) => ({
  type: coursesActionTypes.SET_FILTERED_COURSES,
  payload: filteredCourses,
});

export const setSelectedCourse = (selectedCourse) => ({
  type: coursesActionTypes.SET_SELECTED_COURSE,
  payload: selectedCourse,
});

export const setSelectedCourseContents = (selectedCourseContents) => ({
  type: coursesActionTypes.SET_SELECTED_COURSE_CONTENTS,
  payload: selectedCourseContents,
});

export const resetCourses = () => ({
  type: coursesActionTypes.RESET_COURSES,
});

export const resetSelectedCourse = () => ({
  type: coursesActionTypes.RESET_SELECTED_COURSE,
});

export const resetSelectedCourseContents = () => ({
  type: coursesActionTypes.RESET_SELECTED_COURSE_CONTENTS,
});

export const resetFilteredCourses = () => ({
  type: coursesActionTypes.RESET_FILTERED_COURSES,
});
