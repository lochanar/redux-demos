import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";

export const loadAuthorsSuccess = authors => {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  };
};

// Thunk to load authors
export function loadAuthors() {
  return function(dispatch) {
    return authorApi
      .getAuthors()
      .then(authors => dispatch(loadAuthorsSuccess(authors)))
      .catch(error => {
        throw error;
      });
  };
}
