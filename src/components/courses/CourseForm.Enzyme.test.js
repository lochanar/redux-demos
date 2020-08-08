import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

function renderDefaultCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    saving: false,
    errors: {},
    onChange: () => {},
    onSave: () => {}
  };

  // args can override the defaults if sent
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

describe("<CourseForm/>", () => {
  it("test that courseform renders a header and a form", () => {
    const wrapper = renderDefaultCourseForm();
    // console.log(wrapper.debug());
    expect(wrapper.find("h2").text()).toEqual("Add Course");
    expect(wrapper.find("form")).toHaveLength(1);
  });

  // Does the same test as our Snapshot test but more focussed
  it("test that submit button text is 'Saving' when saving is true", () => {
    const wrapper = renderDefaultCourseForm({ saving: true });
    expect(wrapper.find("button").text()).toEqual("Saving...");
  });
});
