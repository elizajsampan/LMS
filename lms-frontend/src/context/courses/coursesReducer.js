import coursesActionTypes from "./coursesActionTypes";

const coursesReducer = (state, action) => {
  switch (action.type) {
    case coursesActionTypes.ADD_COURSE:
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case coursesActionTypes.EDIT_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id
            ? action.payload.updatedCourse
            : course
        ),
      };
    case coursesActionTypes.DELETE_COURSE_START:
      return {
        ...state,
        courseIdToDelete: action.payload,
        showDeleteCourseConfirmationModal: true,
      };
    case coursesActionTypes.DELETE_COURSE_FINISH:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.courseId !== state.courseIdToDelete
        ),
        courseIdToDelete: null,
        showDeleteCourseConfirmationModal: false,
      };
    case coursesActionTypes.DELETE_COURSE_CANCEL:
      return {
        ...state,
        courseIdToDelete: null,
        showDeleteCourseConfirmationModal: false,
      };
    case coursesActionTypes.SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case coursesActionTypes.SET_FILTERED_COURSES:
      return {
        ...state,
        filteredCourses: action.payload,
      };
    case coursesActionTypes.SET_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: action.payload,
      };
    case coursesActionTypes.SET_SELECTED_COURSE_CONTENTS:
      return {
        ...state,
        selectedCourseContents: action.payload,
      };
    case coursesActionTypes.RESET_SELECTED_COURSE:
      return {
        ...state,
        selectedCourse: null,
      };
    case coursesActionTypes.RESET_FILTERED_COURSES:
      return {
        ...state,
        filteredCourses: [],
      };
    case coursesActionTypes.RESET_SELECTED_COURSE_CONTENTS:
      return {
        ...state,
        selectedCourseContents: [],
      };
    case coursesActionTypes.RESET_COURSES:
      return {
        ...state,
        courses: [],
      };
    default:
      return state;
  }
};

export default coursesReducer;
