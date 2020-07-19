import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import CoursesList from "./CoursesList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const {
      actions: { loadCourses, loadAuthors },
      authors,
      courses
    } = this.props;

    // This makes sure courses and authors are not fetched if they are loaded once
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Error in loading courses" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Error in loading authors" + error);
      });
    }
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CoursesList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  // Since both courses data and author data are fetched separately in an async manner,
  // need to ensure author data is available before we do the courses author name mapping
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
}

// We are injecting any actions declared in courseActions to our component under a prop called `actions`
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

// Even if you omit the mapDispatchToProps arg, you wil still have access to dispatch as a prop
// because of the connect function
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
