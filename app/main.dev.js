import path from 'path';
import url from 'url';
import {app, crashReporter, BrowserWindow, Menu, Tray, ipcMain, nativeImage} from 'electron';
const electron = require('electron');

let mainWindow = null;
let tray = null;
let trayIcon = nativeImage.createFromPath('Resources/datasetTools_tray_icon_menuIsVisible.png')


// declare variables to id process environment
const isDevelopment = (process.env.NODE_ENV === 'development');
const isProduction = (process.env.NODE_ENV === 'production');

if (isProduction) {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// Dev tools
if (isDevelopment || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions();
  }
  mainWindow = new BrowserWindow({
    show: false,
    width: 1000,
    minWidth: 540,
    minHeight: 400,
    height: 800,
    resizable: true,
    center: true,
    icon: path.join(__dirname + 'Resources/assets/icons/png/64x64.png'),
    frame: true,
    titleBarStyle: 'hiddenInset'
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (process.platform === 'darwin') {
      let forceQuit = false;
      mainWindow.on('close', function (e) {
        if (!forceQuit) {
          e.preventDefault();
          mainWindow.hide();
        }
      });

      app.on('activate', () => {
        mainWindow.show();
      });

      app.on('before-quit', () => {
        forceQuit = true;
      });
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });
    }
  });

/////////  tray

  if (!tray) {
    tray = new Tray(trayIcon);
  }

  tray.on('click', function(event) {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })

  tray.setToolTip('dataset.tools')

///////// menu bar creation

  const menu = Menu.buildFromTemplate(fileMenu)

  Menu.setApplicationMenu(menu)

  if (isDevelopment) {
    // auto-open dev tools
    // mainWindow.webContents.openDevTools();

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(props.x, props.y);
        }
      }]).popup(mainWindow);
    });
  }
});


// set options for desktop app menubar

let fileMenu = [{
  label: 'Go to',
  submenu: [{
    label: 'dataset.tools',
    accelerator: 'CmdOrCtrl+T',
    click: function (event) {
      require('electron').shell.openExternal('http://dataset.tools')
    }
  }, {
    label: 'data.world',
    accelerator: 'CmdOrCtrl+D',
    click: function (event) {
      require('electron').shell.openExternal('http://data.world')
    }
  }, {
    type: 'separator'
  }, {
    label: 'Your local dataset folder',
    accelerator: 'CmdOrCtrl+O',
    click: function (event) {
      require('electron').shell.showItemInFolder(`${storage}`)
    }
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'About dataset.tools',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: 'dataset.tools usage',
          buttons: ['Ok'],
          message: 'dataset.tools is a utility built for data.world users. Quickly access any of your datasets which need cleaning, edit locally, then update data.world profile with newly cleaned files'
        }
        electron.dialog.showMessageBox(focusedWindow, options, function () {})
      }
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reopen Window',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }]
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: 'Checking for Update',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = 'dataset.tools'
  fileMenu.unshift({
    label: 'dataset.tools',
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // Window menu.
  fileMenu[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(fileMenu[0].submenu, 1)
}


// function createWindow () {
//   mainWindow = new BrowserWindow({
//     show: false,
//     width: 800,
//     minWidth: 540,
//     minHeight: 400,
//     height: 800,
//     resizable: true,
//     center: true,
//     icon: path.join(__dirname + 'Resources/assets/icons/png/64x64.png'),
//     frame: true,
//     titleBarStyle: 'hiddenInset'
//     });
//
//   mainWindow.webContents.once('did-finish-load', () => {
//     mainWindow.show();
//   });
//
//   mainWindow.once('ready-to-show', () => {
//     mainWindow.show();
//     mainWindow.focus();
//   })
//
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'app.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//
//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   })
//
//   if (!tray) {
//     tray = new Tray(trayIcon);
//   }
//
//   // menubar icon click handler
//   tray.on('click', function(event) {
//     toggleWindowFromTray()
//   })
//
//   tray.setToolTip('dataset.tools')
//
//   const menu = Menu.buildFromTemplate(fileMenu)
//
//   Menu.setApplicationMenu(menu)
//
// }
//
//
//
//
// //TODO: make the tray icon change off/on when toggled
// const toggleWindowFromTray = () => {
//   if (window) {
//     if (window.isVisible()) {
//       window.hide()
//     } else {
//       showWindow();
//       window.isMovable(false);
//     }
//   } else {
//     createWindow();
//   }
// }
//
// const showWindow = () => {
//   const trayPos = tray.getBounds()
//   const windowPos = mainWindow.getBounds()
//   let x, y = 0
//   if (process.platform == 'darwin') {
//     x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
//     y = Math.round(trayPos.y + trayPos.height)
//   } else {
//     x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
//     y = Math.round(trayPos.y + trayPos.height * 10)
//   }
//   mainWindow.setPosition(x, y, false)
//   mainWindow.show()
//   mainWindow.focus()
// }
//
// ipcMain.on('show-window', () => {
//   showWindow()
// })
//
// app.on('ready', createWindow);
//
// app.on('activate', toggleWindowFromDock);
//
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
//
// // set options for desktop app menubar
// let fileMenu = [{
//   label: 'Go to',
//   submenu: [{
//     label: 'dataset.tools',
//     accelerator: 'CmdOrCtrl+T',
//     click: function (event) {
//       require('electron').shell.openExternal('http://dataset.tools')
//     }
//   }, {
//     label: 'data.world',
//     accelerator: 'CmdOrCtrl+D',
//     click: function (event) {
//       require('electron').shell.openExternal('http://data.world')
//     }
//   }, {
//     type: 'separator'
//   }, {
//     label: 'Your local dataset folder',
//     accelerator: 'CmdOrCtrl+O',
//     click: function (event) {
//       require('electron').shell.showItemInFolder(`${storage}`)
//     }
//   }]
// }, {
//   label: 'View',
//   submenu: [{
//     label: 'Reload',
//     accelerator: 'CmdOrCtrl+R',
//     click: function (item, focusedWindow) {
//       if (focusedWindow) {
//         // on reload, start fresh and close any old
//         // open secondary windows
//         if (focusedWindow.id === 1) {
//           BrowserWindow.getAllWindows().forEach(function (win) {
//             if (win.id > 1) {
//               win.close()
//             }
//           })
//         }
//         focusedWindow.reload()
//       }
//     }
//   }, {
//     label: 'Toggle Full Screen',
//     accelerator: (function () {
//       if (process.platform === 'darwin') {
//         return 'Ctrl+Command+F'
//       } else {
//         return 'F11'
//       }
//     })(),
//     click: function (item, focusedWindow) {
//       if (focusedWindow) {
//         focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
//       }
//     }
//   }, {
//     label: 'Toggle Developer Tools',
//     accelerator: (function () {
//       if (process.platform === 'darwin') {
//         return 'Alt+Command+I'
//       } else {
//         return 'Ctrl+Shift+I'
//       }
//     })(),
//     click: function (item, focusedWindow) {
//       if (focusedWindow) {
//         focusedWindow.toggleDevTools()
//       }
//     }
//   }, {
//     type: 'separator'
//   }, {
//     label: 'About dataset.tools',
//     click: function (item, focusedWindow) {
//       if (focusedWindow) {
//         const options = {
//           type: 'info',
//           title: 'dataset.tools usage',
//           buttons: ['Ok'],
//           message: 'dataset.tools is a utility built for data.world users. Quickly access any of your datasets which need cleaning, edit locally, then update data.world profile with newly cleaned files'
//         }
//         electron.dialog.showMessageBox(focusedWindow, options, function () {})
//       }
//     }
//   }]
// }, {
//   label: 'Window',
//   role: 'window',
//   submenu: [{
//     label: 'Minimize',
//     accelerator: 'CmdOrCtrl+M',
//     role: 'minimize'
//   }, {
//     label: 'Close',
//     accelerator: 'CmdOrCtrl+W',
//     role: 'close'
//   }, {
//     type: 'separator'
//   }, {
//     label: 'Reopen Window',
//     accelerator: 'CmdOrCtrl+Shift+T',
//     enabled: false,
//     key: 'reopenMenuItem',
//     click: function () {
//       app.emit('activate')
//     }
//   }]
// }, {
//   label: 'Help',
//   role: 'help',
//   submenu: [{
//     label: 'Learn More',
//     click: function () {
//       electron.shell.openExternal('http://electron.atom.io')
//     }
//   }]
// }]
//
// function addUpdateMenuItems (items, position) {
//   if (process.mas) return
//
//   const version = electron.app.getVersion()
//   let updateItems = [{
//     label: `Version ${version}`,
//     enabled: false
//   }, {
//     label: 'Checking for Update',
//     enabled: false,
//     key: 'checkingForUpdate'
//   }, {
//     label: 'Check for Update',
//     visible: false,
//     key: 'checkForUpdate',
//     click: function () {
//       require('electron').autoUpdater.checkForUpdates()
//     }
//   }, {
//     label: 'Restart and Install Update',
//     enabled: true,
//     visible: false,
//     key: 'restartToUpdate',
//     click: function () {
//       require('electron').autoUpdater.quitAndInstall()
//     }
//   }]
//
//   items.splice.apply(items, [position, 0].concat(updateItems))
// }
//
// function findReopenMenuItem () {
//   const menu = Menu.getApplicationMenu()
//   if (!menu) return
//
//   let reopenMenuItem
//   menu.items.forEach(function (item) {
//     if (item.submenu) {
//       item.submenu.items.forEach(function (item) {
//         if (item.key === 'reopenMenuItem') {
//           reopenMenuItem = item
//         }
//       })
//     }
//   })
//   return reopenMenuItem
// }
//
// if (process.platform === 'darwin') {
//   const name = 'dataset.tools'
//   fileMenu.unshift({
//     label: 'dataset.tools',
//     submenu: [{
//       label: `About ${name}`,
//       role: 'about'
//     }, {
//       type: 'separator'
//     }, {
//       label: 'Services',
//       role: 'services',
//       submenu: []
//     }, {
//       type: 'separator'
//     }, {
//       label: `Hide ${name}`,
//       accelerator: 'Command+H',
//       role: 'hide'
//     }, {
//       label: 'Hide Others',
//       accelerator: 'Command+Alt+H',
//       role: 'hideothers'
//     }, {
//       label: 'Show All',
//       role: 'unhide'
//     }, {
//       type: 'separator'
//     }, {
//       label: 'Quit',
//       accelerator: 'Command+Q',
//       click: function () {
//         app.quit()
//       }
//     }]
//   })
//
//   // Window menu.
//   fileMenu[3].submenu.push({
//     type: 'separator'
//   }, {
//     label: 'Bring All to Front',
//     role: 'front'
//   })
//
//   addUpdateMenuItems(fileMenu[0].submenu, 1)
// }
//
// // windows build
// if (process.platform === 'win32') {
//   const helpMenu = fileMenu[fileMenu.length - 1].submenu
//   addUpdateMenuItems(helpMenu, 0)
// }
//
//
// app.on('browser-window-created', function () {
//   let reopenMenuItem = findReopenMenuItem()
//   if (reopenMenuItem) reopenMenuItem.enabled = false
// })
//
// app.on('window-all-closed', function () {
//   let reopenMenuItem = findReopenMenuItem()
//   if (reopenMenuItem) reopenMenuItem.enabled = true
// })
