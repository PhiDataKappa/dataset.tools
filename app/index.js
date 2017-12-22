import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import './ReactotronConfig';

const store = configureStore();

render(
  <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>
</MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>
    </MuiThemeProvider>,
      document.getElementById('root')
    );
  });
}

const {ipcRenderer} = require('electron')

document.addEventListener('DOMContentLoaded', () => {
  let n = new Notification('dataset.tools ready!', {
    body: 'Tooling up.'
  })

  // Tell the notification to show the menubar popup window on click
  n.onclick = () => { ipcRenderer.send('show-window') }
})
