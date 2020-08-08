import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("should set submit btn text to 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("should set submit btn text to 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
