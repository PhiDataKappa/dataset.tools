import {DOWNLOAD} from '../actions/Download';

export type downStateType = {
  +download : data
};

export default function download(state: data = 0, action: actionType) {
  switch (action.type) {
    case DOWNLOAD:
      return inLocalFolder;
    default:
      return state;

  }
}
