import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
// With mount, gotta pull react-router's MemoryRouter because the Header component expects to be run as
// a child of React Router and receive React Router's props. This is because Header is actually rendered with
// mount. But it's not rendered with shallow!
import { MemoryRouter } from "react-router-dom";

it("test that 3 links are there in Header via shallow", () => {
  // With shallow you can search by component tag because it's not rendered
  const links = shallow(<Header />).find("NavLink");
  expect(links).toHaveLength(3);
});

it("test that 3 links are there in Header via mount", () => {
  // With mount, it's better to search for the final rendered HTML tag since it generates final DOM
  const links = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a");
  expect(links).toHaveLength(3);
});
