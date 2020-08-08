import { courses } from "../../../tools/mockData";
import * as courseActions from "./courseActions";
import * as types from "./actionTypes";

// Need these to test thunks
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe("test async actions", () => {
  afterEach(() => {
    fetchMock.restore;
  });

  describe("test load courses thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses succeeds", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

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
