/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import MainPage from './containers/mainpage';
// component that renders navigation and any mathcing routes inside a <App /> tag
  // <App> can be deconstructed into <header> and <main> if desired
export default () => (
  <App>
    <Switch>
      <Route  exact path="/counter" component={CounterPage} />
      <Route  exact path="/mainpage" component={MainPage} />
      <Route  path="/" component={HomePage} />
    </Switch>
  </App>
);
