const shell = require('electron').shell

const openExLinksInBrowser = document.getElementById('open-ex-links-dataworld')

//opens an external link (i.e. data.world) website in browser.
openExLinksInBrowser.addEventListener('click', function (event) {
  shell.openExternal('http://data.world')   // NOTE: concat username to end of URL (i.e. http://data.world/user) to go straight to users homepage
})


//NOTE: if multiple external links added (i.e. 'http://dataset.tools') use the following block instead of openExLinksInBrowser.
// const links = document.querySelectorAll('a[href]')
//
// Array.prototype.forEach.call(links, function (link) {
//   const url = link.getAttribute('href')
//   if (url.indexOf('http') === 0) {
//     link.addEventListener('click', function (e) {
//       e.preventDefault()
//       shell.openExternal(url)
//     })
//   }
// })
