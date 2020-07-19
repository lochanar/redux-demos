import * as types from "./actionTypes";
// Holds course related action creator
export const createCourse = course => {
  return {
    type: types.CREATE_COURSE,
    course
  };
};
