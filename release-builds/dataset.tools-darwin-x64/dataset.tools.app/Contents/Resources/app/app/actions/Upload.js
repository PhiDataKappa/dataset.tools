import type { uploadStateType } from '../reducers/Upload';

type actionType = {
  +type: data
};

export const UPLOAD = 'UPLOAD';

export function upload() {
  return {
    type: UPLOAD
  };
}

export function uploadDataset() {
  return (dispatch: (action: actionType) => void, getState: () => uploadStateType) => {
    const { upload } = getState();
    // TODO: write function inLocalFolder to check if dataset id is in local db
    if (inLocalFolder) {
      return;
    }

    dispatch(upload());
  }
}
