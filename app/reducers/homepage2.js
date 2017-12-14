import { SET_SHOULD_REDIRECT} from '../actions/homepage';

export default function shouldRedirectReducer(state = {}, action) {
  switch(action.type) {
    case 'SET_SHOULD_REDIRECT':
      return action.text
    default:
      return state;
  }
}
