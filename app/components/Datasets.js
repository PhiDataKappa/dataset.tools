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
   let openInFolder = (name) =>{
     require('electron').shell.showItemInFolder(`${storage}/${name}`);
   }
   return (
     <div>
     <div className='datasetTable' style={tableStyles}>
     <Table onRowSelection={this.handleRowSelection}  >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Project</TableHeaderColumn>
            <TableHeaderColumn>Size</TableHeaderColumn>
            <TableHeaderColumn>Download</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { selectedDataset().map((project, index) =>
              project.files.map((file, index2) =>
            <TableRow>
            <TableRowColumn>{file.name}</TableRowColumn>
            <TableRowColumn>{project.title}</TableRowColumn>
            <TableRowColumn>{(file.sizeInBytes/1000)} kb</TableRowColumn>
            <TableRowColumn><RaisedButton onClick={() => this.getFile(project.owner, project.id, file.name, this.props.token)}>Download</RaisedButton></TableRowColumn>
            <TableRowColumn><RaisedButton onClick={() => this.sendFile(project.owner, project.id, file.name, this.props.token)}>Upload</RaisedButton></TableRowColumn>
            <TableRowColumn><RaisedButton onClick={() => openInFolder(file.name)}>Show in Finder</RaisedButton></TableRowColumn>
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
