export default function setSelectedDatasetsReducer(state = null, action) {
  switch(action.type) {
    case 'SET_SELECTED_DATASETS':
      return action.text
    default:
      return state;
  }
}
