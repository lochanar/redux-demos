import { courses } from "../../../tools/mockData";
import * as courseActions from "./courseActions";
import * as types from "./actionTypes";

describe("test courseActions", () => {
  it("test that CREATE_COURSE_SUCCESS action is created", () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    // act
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
