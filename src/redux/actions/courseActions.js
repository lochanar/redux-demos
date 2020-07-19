import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
// Holds course related action creator
export const createCourse = course => {
  return {
    type: types.CREATE_COURSE,
    course
  };
};

export const loadCoursesSuccess = courses => {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
};
// Thunk to load courses
export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => dispatch(loadCoursesSuccess(courses)))
      .catch(error => {
        throw error;
      });
  };
}
