import { ADD_USER_DATA} from '../actions/mainpage';

export default function addUserDataReducer(state = {}, action) {
  switch(action.type) {
    case 'ADD_USER_DATA':
      return action.data
    default:
      return state;
  }
}
