// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500, grey400
} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Flexbox from 'flexbox-react';
import styled from 'styled-components';
import Datasets from '../containers/Datasets';
import Projects from '../containers/Projects';
import FlatButton from 'material-ui/FlatButton';
import { Redirect } from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';


export default class MainPage extends Component {
  constructor(props){
    super(props);
    console.log('props',props);
    this.state = {
      open:false,
      projects: [],
      mainview: 'Projects',
      logout:false
    }
  }
  componentDidMount() {
    console.log('in mount', this.props.token);
    if (this.props.token) {
      axios.get('http://localhost:8080/getUserDatasets', {params: {accessToken: this.props.token}})
      .then((data) => {
        console.log('this is data in componentDidMount', data);
        this.props.actions.mainPageActions.addUserData(data.data.records);
        console.log(data.data.records);
        //this.setState({projects: data.data.records});

      })
    } else { console.log("Where's my token")}
  }


  logout = () => {
    this.props.actions.homePageActions.setShouldRedirect(false);
    this.setState({logout:true})
  }



  render() {
    var that = this;

    var forceNavDown = {'top': '72px'};
    var positionTitle = {'top': '-8px', 'backgroundColor': grey400, 'height':'73px', 'paddingTop':'12px'};

  var switchView = function (view) {
    console.log('view at first', view);
    console.log('running switchView');
    if (view === 'Datasets') {
      that.props.actions.ProjectsActions.setSelectedProject(null);
    }
    that.props.actions.mainPageActions.changeView(view);

  }

  var getNewFiles = function () {
    if (that.props.token) {
      axios.get('http://localhost:8080/getUserDatasets', {params: {accessToken: that.props.token}})
      .then((data) => {
        console.log('this is data in componentDidMount', data);
        that.props.actions.mainPageActions.addUserData(data.data.records);
        console.log(data.data.records);
        //this.setState({projects: data.data.records});

      })
    } else { console.log("Where's my token")}
  }

  var MainView = function (view) {
    var view = that.props.mainView  || 'Projects';
    if (view === 'Projects'){
      return <Projects/>;
    } else {
      return <Datasets/>;
    }
  }

    return (
      <div style={{height: '100vh'}}>
          <AppBar title="dataset.tools" showMenuIconButton={false}  style={positionTitle} iconElementRight={<FlatButton onClick={this.logout} label="Log Out" />} />
          <div className="Container" style={{display: 'flex', 'top': '62px', height: '100%' }}>
            <div className="Sidebar" style={{flexShrink: 0, 'backgroundColor': '#333d49', width: '150px', marginTop:'-10px'}}>
              <List >
                <ListItem primaryText="Projects" onClick={() => switchView('Projects')} />
                <ListItem primaryText="Datasets" onClick={() => switchView('Datasets')}/>
                <ListItem primaryText="Sync Files" onClick={() => getNewFiles()}/>
              </List>
              <Divider />
            </div>
            <div className='mainContent' style={{flexGrow: 1, flexShrink: 1}}>
              {MainView()}
            </div>
          </div>
      {this.state.logout && (
        <Redirect to ={'/'}/>
      )}
  </div>
    );
  }
}
