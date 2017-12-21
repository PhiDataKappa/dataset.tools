import React, { Component } from 'react';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import $ from 'jquery';
import csv from 'csvtojson'
var fs = require('fs');
var storage = '../datasets';
//------------------------------------------------------------------------------------------------
export default class Datasets extends Component {
  constructor(props){
    super(props);
    console.log('props in dataset',props);
    console.log('this.props in dataset',this.props);
  }
//------------------------------------------------------------------------------------------------
 componentDidMount() {
   console.log('mounting Datasets');
   this.props.actions.DatasetsActions.setSelectedDataset(null);
 }
//------------------------------------------------------------------------------------------------
 componentWillUnmount() {
   console.log('unmounting dataset')
   this.props.actions.ProjectsActions.setSelectedProject(null);
 }
//------------------------------------------------------------------------------------------------
 showDatasetInfo(row, column, event) {
   console.log('clicked');
   console.log('this')
   console.log(row, column, event);
   console.log(event.target.innerHTML);
   var dataset = event.target.innerHTML;
   console.log(dataset);
   if (column === 0) {
     this.props.actions.DatasetsActions.setSelectedDataset(dataset);
   }
 }
//------------------------------------------------------------------------------------------------
 getFile(owner, id, name, token) {
   console.log('getting file' + name);
   axios.get('http://localhost:8080/downloadDatasets', {params: {owner: owner, projectID: id, file: name, at: token}})
   .then((response) => {
     //this.props.actions.mainPageActions.addUserData(data.data.records);
     //-------Added---------------
     // Change the content of the file as you want
     // or either set fileContent to null to create an empty file
//      var fileContent = JSON.stringify(data);

     //create new folder if not existent
     if (!fs.existsSync(storage)){
       fs.mkdirSync(storage);
     }

     // The absolute path of the new file with its name
     var filepath = "mynewfile.csv";
     // var path = (String(process.cwd()).split('/'));
     // console.log('path after split',path)
     // path.pop()
     var path = storage + '/' + name;
     console.log('path:', path)
     fs.writeFile(path, response.data, "utf8", (err) => {
       console.log("response",response);
       if (err) throw err;
       console.log("The file was succesfully saved!");
     });
   })
 }
//------------------------------------------------------------------------------------------------
 sendFile(owner,id,name,token){
   const csvFilePath='../../Desktop/datasets/additions.csv'

   fs.readFile(`../../Desktop/datasets/additions.csv`, "utf8", (err, data) => {

     var settings = {
       "async": true,
       "crossDomain": true,
       "url": "https://api.data.world/v0/uploads/joshuapawlik/test-csv/files/newdataset?expandArchive=false",
       "method": "PUT",
       "headers": {
         "authorization": "Bearer" + token
       },
       contentType: 'application/json',
       "data": data
     }

     $.ajax(settings).done(function (response) {
       console.log('response',response);
     });
     console.log(token)
     // eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Ompvc2h1YXBhd2xpayIsImlzcyI6ImFnZW50Ompvc2h1YXBhd2xpazo6ZTVkZGFlNjYtNDU0ZS00NmY1LThmMGQtZmE4NDlmNTY0YmE4IiwiaWF0IjoxNTEyNDk1NjU3LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSIsInVzZXJfYXBpX2FkbWluIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZX0.DHmCQbfwUuAOhaUrRSrwMxMQZh3fD0Oakh0NEB2d5Zpi2tas3IzIk1Jav3HZskQaOS5xuw5zQ8Hd-lpBVrMGgA
});

 }
//------------------------------------------------------------------------------------------------

 render() {
   var that = this
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   var tableStyles = {
     height: '500px',
     overflowY: 'auto'
   }
   var clicked = () => {console.log('clicked')}

   var selectedDataset = function () {
      if (that.props.selectedProject === null) {
       console.log('running 1')
       return hasUserData;
     } else {
       console.log('running 2')
       return [hasUserData[that.props.selectedProject]]
     }
   }
   /*var showDatasetInfo = function () {
     var curDataset = this.props.selectedDataset  || false;
     if (curDataset){
       return <div><p>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p></div>;
     } else {
       return <div><p>?????????????????????????????</p></div>;
     }
     //return <div><p>??????????????????????????????????????????????????????????????????</p></div>
   }
      {thisshowDatasetInfo.call(this)}

   */
   //onCellClick={console.log(rowNumber, columnID, 'clicked')}
   return (
     <div>
     <div className="table" style={tableStyles}>
     <Table onRowSelection={this.handleRowSelection}  >
        <TableHeader>
          <TableRow className="row">
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Project</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Size</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Download</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Upload</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Show in Finder</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { selectedDataset().map((project, index) =>
              project.files.map((file, index2) =>
            <TableRow className="row">
            <TableRowColumn style={{color: "black"}}>{file.name}</TableRowColumn>
            <TableRowColumn style={{color: "black"}}>{project.title}</TableRowColumn>
            <TableRowColumn style={{color: "black"}}>{(file.sizeInBytes/1000)} kb</TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#5dc0de" onClick={() => this.getFile(project.owner, project.id, file.name, this.props.token)}>Download</RaisedButton></TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#5dc0de" className="uploadDownloadBtn" onClick={() => this.sendFile(project.owner, project.id, file.name, this.props.token)}>Upload</RaisedButton></TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#f7f7f7" onClick={() => require('electron').shell.openExternal('file:///Users/hackreactoratx1/Desktop/dataset.tools/Resources')}>Show</RaisedButton></TableRowColumn>
          </TableRow>
            )
          )}

        </TableBody>
      </Table>
   </div>

 </div>
   )
 }
}
