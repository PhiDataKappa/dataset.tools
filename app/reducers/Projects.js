export default function setSelectedProjectReducer(state = null, action) {
  switch(action.type) {
    case 'SET_SELECTED_PROJECT':
      return action.text
    default:
      return state;
  }
}
