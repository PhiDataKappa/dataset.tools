export default function setDownloadedDatasetsReducer(state = ['tabernacle'], action) {
  var file = action.text

  //let newObj = {};
  //newObj[action.text] = true;

  switch(action.type) {
    case 'SET_DOWNLOADED_DATASETS':
      //return  state.slice(0).push(action[type]);
      //return 'hello'
      return state.slice(0).concat([file]);
    /*  return {
      ...state,
      arr: state.arr.concat([file])
    }*/
    //  return state.slice(0).push(file);
    case 'REMOVE_DOWNLOADED_DATASET':
      return state.slice(0, action.index).concat(state.slice(action.index + 1));
    default:
      return state;
  }
}
