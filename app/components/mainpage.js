// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500, grey700
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
    //functions
    // console.log(this.props)
    // console.log(this.props.token);

    var forceNavDown = {'top': '72px'};
    var positionTitle = {'top': '-8px', 'backgroundColor':grey700, 'height':'73px'};

  var switchView = function (view) {
    console.log('view at first');
    console.log('running switchView');
    that.props.actions.mainPageActions.changeView(view);

  }
  //      <p>{JSON.stringify(this.state.projects)}</p>

  var MainView = function (view) {
    var view = that.props.mainView  || 'Datasets';
    if (view === 'Projects'){
      return <Projects/>;
    } else {
      return <Datasets/>;
    }
  }

//  return <Projects/>
//}

    return (
      <div>
      <div>
       <AppBar title="dataset.tools" showMenuIconButton={false}  style={positionTitle} iconElementRight={<FlatButton onClick={this.logout} label="Log Out" />} />
       <div className='mainContent'>
        {MainView()}
       </div>
      <Drawer className='nav' open={true} containerStyle={forceNavDown}>
        <MenuItem onClick={() => switchView('Projects')}>Projects</MenuItem>
        <MenuItem onClick={() => switchView('Datasets')}>Datasets </MenuItem>
        <MenuItem>Upload DataSet</MenuItem>
      </Drawer>
      </div>
      {this.state.logout && (
        <Redirect to ={'/'}/>
      )}
    </div>
    );
  }
}
