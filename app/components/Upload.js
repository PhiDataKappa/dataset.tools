import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/RaisedButton';


export default class Upload extends Component {
  constructor(props){
    super(props);
    console.log('props in upload',props)
    console.log('this.props in upload',this.props)
  }

<<<<<<< HEAD
render() {
    return (
      <div>
        <TextField hintText="Title"></TextField>
        <TextField hintText="Description"></TextField>
=======
  render() {
    return (
      <div>
        <TextField hintText="Title"></TextField>
        <br/>
        <TextField hintText="Description"></TextField>
        <br/>
>>>>>>> 6bae0a2d65ea4d7bb2d3098cf030a2bf9ed89843
        <FlatButton label="Upload"></FlatButton>
      </div>
    )
  }
}
