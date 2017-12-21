import React, { Component } from 'react';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import $ from 'jquery';
import csv from 'csvtojson'
const fs = require('fs');
const storage = '../datasets';
const {ipcRenderer} = require('electron');
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

     //create new folder if not existent
     if (!fs.existsSync(storage)){
       fs.mkdirSync(storage);
     }

     // The absolute path of the new file with its name
     var filepath = "mynewfile.csv";
     var path = storage + '/' + name;
     console.log('path:', path)
     fs.writeFile(path, response.data, "utf8", (err) => {
       console.log("response",response);
       if (err) {
         throw err;
       } else {
         // system notification confirming download action
         let downloadNotification = new Notification('Dataset successfully downloaded!', {
           body: 'Open in you local folder to edit.'
         })
         downloadNotification.onclick = () => { require('electron').shell.showItemInFolder(require('os').homedir()) }

         console.log("The file was succesfully saved locally*************!");
       }
     });
   })
 }
//------------------------------------------------------------------------------------------------
 sendFile(owner,id,name,token){
 let filePath = `${storage}/${name}`
   fs.readFile(`${storage}/${name}`, "utf8", (err, data) => {
     console.log('data from readFile',data);

     var settings = {
       "async": true,
       "crossDomain": true,
       "url": `https://api.data.world/v0/uploads/${owner}/${id}/files/${name}?expandArchive=false`,
       "method": "PUT",
       "headers": {
         "authorization": `Bearer ${token}`
       },
       contentType: 'application/json',
       "data": data
     }

     $.ajax(settings).done(function (response) {
       console.log('response',response);
       fs.unlink(filePath,(err)=>{
         if(err) alert('an error has occured');
         else {console.log('executed');}
       })
     });
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

   let openInFolder = (name) =>{
     require('electron').shell.showItemInFolder(`${storage}/${name}`);
   }
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
            <TableRowColumn style={{color: "black"}}>{(file.sizeInBytes/1000 > 1000) ? (Math.floor(file.sizeInBytes/1000)/1000 + ' MB') : (Math.floor(file.sizeInBytes/10)/100 + ' KB')}</TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#5dc0de" onClick={() => this.getFile(project.owner, project.id, file.name, this.props.token)}>Download</RaisedButton></TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#5dc0de" className="uploadDownloadBtn" onClick={() => this.sendFile(project.owner, project.id, file.name, this.props.token)}>Upload</RaisedButton></TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#f7f7f7" onClick={() => openInFolder(file.name)}>Show</RaisedButton></TableRowColumn>
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
