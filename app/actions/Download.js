import type { downloadStateType } from '../reducers/Download';

type actionType = {
  +type: data
};

export const DOWNLOAD = 'DOWNLOAD';

export function download() {
  return {
    type: DOWNLOAD
  };
}

export function downloadDataset() {
  return (dispatch: (action: actionType) => void, getState: () => downloadStateType) => {
    const { download } = getState();
    // TODO: write function inLocalFolder to check if dataset id is in local db
    if (inLocalFolder) {
      return;
    }

    dispatch(download());
  }
}
