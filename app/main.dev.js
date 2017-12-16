/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import path from 'path';
import url from 'url';
import {app, crashReporter, BrowserWindow, Menu, Tray } from 'electron';
// const window = require('electron-window');
// import {app, BrowserWindow, Menu} from 'electron';
// import { app, BrowserWindow } from 'electron';
import MenuBuilder from './menu';
// const path = require('path')
// const electron = require('electron')
// const ipc = electron.ipcMain
// const app = electron.app
// const Menu = electron.Menu
// const Tray = electron.Tray
// const crashReporter = electron.crashReporter
// const BrowserWindow = electron.BrowserWindow



const isDevelopment = (process.env.NODE_ENV === 'development');
const isProduction = (process.env.NODE_ENV === 'production');



let mainWindow = null;
// let forceQuit = false;

// var menubar = require('menubar')
// var mb = menubar()
// mb.on('ready', function ready () {
//   console.log('app is ready')
//   // your app code here
// })
//
// let win

// tray and menubar
// function createWindow() {
//    win = new BrowserWindow({width: 1000, height: 400})
//    win.loadURL(url.format ({
//       pathname: path.join(__dirname, 'app.html'),
//       protocol: 'file:',
//       slashes: true
//    }))
// }

// app.on('ready', createWindow)

if (isProduction) {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (isDevelopment || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  // const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload);
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`);
    }
  }
};

// crashReporter.start({
//   productName: 'YourName',
//   companyName: 'YourCompany',
//   submitURL: 'https://data.tools/url-to-submit',
//   uploadToServer: false
// });



/**
 * ========================= Add event listeners...
 */

// app.on('window-all-closed', () => {
//   // Respect the OSX convention of having the application in memory even
//   // after all windows have been closed
//   app.quit();
// });
// const {app, Menu, Tray} = require('electron')

let tray = null
app.on('ready', () => {
  tray = new Tray('Resources/dataset.tools_tray_icon_menuIsVisible.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
    // {
    //   label: 'Remove',
    //   click: function () {
    //     event.sender.send('tray-removed')
    //   }
  ])
  tray.setToolTip('dataset.tools')
  tray.setContextMenu(contextMenu)

  // let appIcon = null
  //
  // ipc.on('put-in-tray', function (event) {
  //   const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  //   const iconPath = path.join(__dirname, iconName)
  //   appIcon = new Tray(iconPath)
  //   const contextMenu = Menu.buildFromTemplate([{
  //     label: 'Remove',
  //     click: function () {
  //       event.sender.send('tray-removed')
  //     }
  //   }])
  //   appIcon.setToolTip('Electron Demo in the tray.')
  //   appIcon.setContextMenu(contextMenu)
  // })
  //
  // ipc.on('remove-tray', function () {
  //   appIcon.destroy()
  // })
  //
  // app.on('window-all-closed', function () {
  //   if (appIcon) appIcon.destroy()
  // })





})




app.on('ready', async () => {
  if (isDevelopment || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    minWidth: 340,
    minHeight: 480,
    height: 800,
    // "use-content-size": true,
    resizable: true,
    center: true,
    frame: true
    });

  // mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  }));

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });



  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // if (process.platform === 'darwin') {
  //   mainWindow.on('closed', () => {
  //     mainWindow = null;
  //   });
  //
  //   app.on('activate', () => {
  //     mainWindow.show();
  //     mainWindow.focus();
  //   });
  //
  //   app.on('before-quit', () => {
  //     forceQuit = true;
  //   });
  // } else {
  //   mainWindow.on('closed', () => {
  //     mainWindow = null;
  //   });
  // }
//
//   const menuBuilder = new MenuBuilder(mainWindow);
//   menuBuilder.buildMenu();
//
//
//   if (isDevelopment) {
//     // auto-open dev tools
//     mainWindow.webContents.openDevTools();
//
//     // add inspect element on right click menu
//     mainWindow.webContents.on('context-menu', (e, props) => {
//       Menu.buildFromTemplate([{
//         label: 'Inspect element',
//         click() {
//           mainWindow.inspectElement(props.x, props.y);
//         }
//       }]).popup(mainWindow);
//     });
//   }
});

function createWindow () {
  // Create the browser window.
  // let mainWindow = new BrowserWindow({width: 1024,height: 738})
  let mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    minWidth: 340,
    minHeight: 480,
    height: 800,
    // "use-content-size": true,
    resizable: true,
    center: true,
     icon: __dirname + '../Resources/assets/dataset.tools_dock_color_bw.png',
    frame: true
    });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

//
// let uploadWin = null
//
// app.on('ready', () => {
//   uploadWin = new BrowserWindow({width: 800, height: 600})
//   uploadWin.loadURL(`file://${__dirname}/index.html`)
//   uploadWin.webContents.on('did-finish-load', () => {
//     uploadWin.webContents.send('ping', 'whoooooooh!')
//   })
// })
