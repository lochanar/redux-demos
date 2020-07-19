import { combineReducers } from "redux";
import courses from "../reducers/courseReducer";
import authors from "../reducers/authorReducer";

// The name of the reducer will impact how we're going to reference
// the reducer's data in store
const rootReducer = combineReducers({
  courses,
  authors
});

export default rootReducer;
