import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import CoursesList from "./CoursesList";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch(error => {
      alert("Error in loading courses" + error);
    });
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
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

// We are injecting any actions declared in courseActions to our component under a prop called `actions`
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

// Even if you omit the mapDispatchToProps arg, you wil still have access to dispatch as a prop
// because of the connect function
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
