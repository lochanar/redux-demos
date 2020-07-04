import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { PropTypes } from "prop-types";

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: ""
      }
    };

    // OPTION 2: Binding in the constructor
    // This is better than OPTION 1 because the function is bound once, no reallocations on each render
    // this.handleOnChange = this.handleOnChange.bind(this);
  }

  // You could also get rid of constructor to instantiate state
  // Can declare state as a class field in OPTION 3, but no access to props this way
  // state = {
  //   course: {
  //     title: ""
  //   }

  // Functions usually inherit `this` context of the caller
  // In this case, `this` refers to context of the caller - change handler `handleOnChange`
  // But we need `this` to refer to our instance of the component
  // handleOnChange(event) {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course: course });
  // }

  // OPTION 3:This is called a class field
  // Arrow functions inherit `this` from their enclosing scope, so it will reference our class instance
  // This is because arrow funcs don't have a binding inside
  handleOnChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      // Adding submit handler to form rather than to submit button to make sure submit occurs on `Enter`
      <form onSubmit={this.handleOnSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          // OPTION 1: to bind `this` of callers to class instance, but this is not ideal
          // Calling bind() within render causes a new function to be created on each render
          // onChange={this.handleOnChange.bind(this)}
          onChange={this.handleOnChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

// Determines what part of the Redux state we pass in as props
// Be SPECIFIC by requesting only the data the component needs from store
// otherwise the component can rerender for unrelated changes in state
function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

// Even if you omit the mapDispatchToProps arg, you wil still have access to dispatch as a prop
// because of the connect function
export default connect(mapStateToProps)(CoursesPage);
