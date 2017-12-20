const shell = require('electron').shell

const openExLinksInBrowser = document.getElementById('open-ex-links-dataworld')

//opens an external link (i.e. data.world) website in browser.
openExLinksInBrowser.addEventListener('click', function (event) {
  shell.openExternal('http://data.world')   // NOTE: concat username to end of URL (i.e. http://data.world/user) to go straight to users homepage
})
