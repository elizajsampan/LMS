import MyCoursesActionTypes from "./myCoursesActionTypes";

const myCoursesReducer = (state, action) => {
  if (action.type === MyCoursesActionTypes.GET_MY_COURSES) {
    return {
      ...state,
      myCourses: action.payload,
    };
  } else if (action.type === MyCoursesActionTypes.ADD_TO_MY_COURSES) {
    return {
      ...state,
      myCourses: [...state.myCourses, action.payload],
    };
  } else if (action.type === MyCoursesActionTypes.REMOVE_FROM_MY_COURSES) {
    const existingCourse = state.myCourses.find(
      (myCourses) => myCourses.myCourseId === action.payload
    );
    if (!existingCourse) {
      return state;
    }
    if (existingCourse) {
      return {
        ...state,
        myCourses: state.myCourses.filter(
          (myCourse) => myCourse.myCourseId !== action.payload
        ),
      };
    }
  } else if (action.type === MyCoursesActionTypes.RESET_MY_COURSES)
    return {
      ...state,
      myCourses: [],
    };
  else {
    return state;
  }
};

export default myCoursesReducer;
