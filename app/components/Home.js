// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import styles from './Home.css';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {orange500, blue500} from 'material-ui/styles/colors';

export default class Home extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect:false
    }
  }

  componentDidMount() {
    if (document.cookie && this.props.shouldRedirect){
      var cookie = document.cookie;
      cookie = cookie.split('=')[1];
      console.log(cookie);
      this.props.addAccessToken(cookie);
      this.props.setShouldRedirect(true);
      this.setState({fireRedirect:true})
    }
  }

  redir = () => {
    var at = document.getElementById('submit').value
    this.props.addAccessToken(at);
    this.setState({fireRedirect:true})
  }


  render() {
    var getFiles = function(){
      axios.get('8080/getdata')
      .then((data) => {
        console.log('Yeah')
      })
      .catch (function (error){
        console.log(error)
      })
      console.log('in getFiles function')
    }

    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2 style={{color: '#f7f7f7'}}>dataset.tools</h2>
          <br/>
          <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
          <img style={{width:"40%", height:"40%"}} id="dwimg" src="../Resources/dw.logo_greyscale.svg"/>
          <RaisedButton style={{width: "120px", height:"auto", padding: "10px", backgroundColor: "#4f5057"}}  backgroundColor="#4f5057" href="http://localhost:8080/authorize">Sign in with data.world</RaisedButton>
        </div>
          {this.state.fireRedirect && (
            <Redirect to ={'/mainpage'}/>
          )}

          <br/>
        </div>
      </div>
    );
  }
}
