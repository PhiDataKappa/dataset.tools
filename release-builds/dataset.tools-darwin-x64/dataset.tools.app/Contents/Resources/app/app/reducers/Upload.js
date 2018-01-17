import { UPLOAD } from '../actions/Upload';

export type uploadStateType = {
  +upload: data // may be file
};

export default function upload(state: data = null, action: actionType) {
  switch (action.type) {
    case UPLOAD:
      return inLocalFolder;
    default:
      return state;
  }
}
