import { combineReducers } from "redux";
import courses from "../reducers/courseReducer";

// The name of the reducer will impact how we're going to reference
// the reducer's data in store
const rootReducer = combineReducers({
  courses
});

export default rootReducer;
