const shell = require('electron').shell

const exLinksBtnDataWorld = document.getElementById('open-ex-links-dataworld')

//opens the data.world website in a new tab in chrome.
exLinksBtnDataWorld.addEventListener('click', function (event) {
  shell.openExternal('http://data.world')   // NOTE: concat username to end of URL (i.e. http://data.world/user) to go straight to users homepage
})
