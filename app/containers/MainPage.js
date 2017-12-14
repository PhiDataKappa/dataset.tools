// @flow
/*
import React, { Component } from 'react';
import MainPage from '../components/mainpage';

export default class Main extends Component {
  render() {
    return (
      <MainPage />
    );
  }
}
*/

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainPage from '../components/mainpage';
import * as MainPageActions from '../actions/mainpage';
import * as HomePageActions from '../actions/homepage';

function mapStateToProps(state) {
return state;
/*  return {
    access_token: state.token,
    path: state.location
  };
  */
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      mainPageActions: bindActionCreators(MainPageActions, dispatch),
      homePageActions: bindActionCreators(HomePageActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
