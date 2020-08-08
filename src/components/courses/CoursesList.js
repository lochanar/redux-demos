import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export const CoursesList = ({ courses }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {courses.map(course => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/courses/" + course.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/course/" + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.authorId}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CoursesList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CoursesList;