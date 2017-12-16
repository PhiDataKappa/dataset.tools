{BrowserWindow} = require('electron');

const {download} = require('electron-dl');

download(BrowserWindow.getFocusedWindow(), "http://url-to-asset", {directory:"c:/Folder"})
