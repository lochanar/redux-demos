import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function renderManageCoursePage(args) {
  const defaultProps = {
    authors,
    courses,
    // Passed in from React Router IRL, just stubbing in for the test.
    // Could also wrap it using a MemoryRouter as shown in Header.test.js,
    // or even wrap it with React Router, if we need to test React Router related behavior
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

it("test that it sets an error when attempting to save an empty title field", () => {
  const wrapper = renderManageCoursePage();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
