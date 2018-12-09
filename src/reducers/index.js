import auth from "./authReducer";
import profile from './profileReducer';
import learning from './learningReducer';
import exercise from './exerciseReducer';
import { combineReducers } from "redux";
import { REQUESTING } from "../actions/actionTypes";
import messageReducer from './messageReducer.js';
import exam from './examReducer';
const isRequesting = function (state = false, action) {
  switch (action.type) {
    case REQUESTING: {
      return true;
    }
    default: return false;
  }
}

const rootReducer = combineReducers({ isRequesting, auth, profile, learning, exercise, messageReducer, exam });
export default rootReducer;
