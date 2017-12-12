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
import Projects from './Projects';
import FlatButton from 'material-ui/FlatButton';

export default class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      projects: [],
      mainview: 'Projects'
    }
  }
  componentDidMount() {
    console.log('in mount', this.props.token);
    if (this.props.token) {
      axios.get('http://localhost:8080/getUserDatasets', {params: {accessToken: this.props.token}})
      .then((data) => {
        console.log('this is data in componentDidMount', data);
        this.props.addUserData(data.data.records);
        console.log(data.data.records);
        //this.setState({projects: data.data.records});

      })
    } else { console.log("Where's my token")}
  }
  render() {
    //functions
    console.log(this.props)
    console.log(this.props.token);
    var that = this;

    var forceNavDown = {'top': '72px'};
    var positionTitle = {'top': '-8px', 'backgroundColor':grey700, 'height':'73px'};

  var switchView = function (view) {
    console.log('view at first');
    console.log('running switchView');
    that.props.changeView(view);

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
       <AppBar title="dataset.tools" showMenuIconButton={false}  style={positionTitle} iconElementRight={<Link to="/"><FlatButton label="Log Out" /></Link>} />
       <div className='mainContent'>
        {MainView()}
       </div>
      <Drawer className='nav' open={true} containerStyle={forceNavDown}>
        <MenuItem onClick={() => switchView('Projects')}>Projects</MenuItem>
        <MenuItem onClick={() => switchView('Datasets')}>Datasets </MenuItem>
        <MenuItem>Upload DataSet</MenuItem>
      </Drawer>
      </div>
    </div>
    );
  }
}
