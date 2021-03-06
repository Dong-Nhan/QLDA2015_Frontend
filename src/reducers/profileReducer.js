import { RECEIVE_PROFILE } from "../actions/actionTypes";
import { RESET_PROFILE } from "../constants";

let initalState = {
  userId: '',
  userName: '',
  pointReward: 0,
  firstName: '',
  lastName: '',
  region: '',
  school: '',
  capacity: '',
  firstNameParent: '',
  lastNameParent: '',
  emailParent: '',
  phoneParent: '',
  regionParent: '',
  medals: [],
  medalList: []
}

export default function (state = initalState, action) {
  switch (action.type) {
    case RECEIVE_PROFILE: {
      return action.profile
    }

    case RESET_PROFILE: {
      return initalState;
    }

    default: return state
  }
}
