const shell = require('electron').shell
const os = require('os')

//location of the client's download folder
const localFolderPath = 'enter/fullPath';

//NOTE: for added feature: "Show in Finder" btn next to datasets which have been downloaded
const showItemInFolder = shell.showItemInFolder(localFolderPath);

//open path in file manager via btn. Used in download & upload functions
const fileManagerBtn = document.getElementById('open-file-manager')

fileManagerBtn.addEventListener('click', function (event) {
  shell.showItemInFolder(os.homedir())
})
