export function setDownloadedDatasets(id, name) {
  return {
    type: 'SET_DOWNLOADED_DATASETS',
    text: name
  }
}

export function removeDownloadedDataset(index) {
  return {
    type: 'REMOVE_DOWNLOADED_DATASET',
    index: index
  }
}
