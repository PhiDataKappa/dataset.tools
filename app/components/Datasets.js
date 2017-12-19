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
   var data = [];
  // csv()
  // .fromFile(csvFilePath)
  // .on('json',(jsonObj)=>{
  //     // combine csv header row and csv line to a json object
  //     // jsonObj.a ==> 1 or 4
  //     console.log("jsonObj",jsonObj);
  //     data.push(JSON.stringify(jsonObj));
  // })
  // .on('done',(error)=>{
  //   data = data.join(',');
  //     console.log('end')
  //     // console.log("data",data)
  // })
//    var data = fs.readFile(`../../Desktop/datasets/additions.csv`, (err, data) => {
//      console.log('in the callback of fs.readFile',data)
// });
   var settings = {
  "async": true,
  "crossDomain": true,
  "url": `https://api.data.world/v0/uploads/${owner}/${id}/files/lookiehere.csv?expandArchive=false`,
  "method": "PUT",
  "headers": {
    "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Ompvc2h1YXBhd2xpayIsImlzcyI6ImFnZW50Ompvc2h1YXBhd2xpazo6ZTVkZGFlNjYtNDU0ZS00NmY1LThmMGQtZmE4NDlmNTY0YmE4IiwiaWF0IjoxNTEyNDk1NjU3LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSIsInVzZXJfYXBpX2FkbWluIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZX0.DHmCQbfwUuAOhaUrRSrwMxMQZh3fD0Oakh0NEB2d5Zpi2tas3IzIk1Jav3HZskQaOS5xuw5zQ8Hd-lpBVrMGgA"
  },
  "data": "{}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});




//    console.log("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50Ompvc2h1YXBhd2xpayIsImlzcyI6ImFnZW50Ompvc2h1YXBhd2xpazo6ZTVkZGFlNjYtNDU0ZS00NmY1LThmMGQtZmE4NDlmNTY0YmE4IiwiaWF0IjoxNTEyNDk1NjU3LCJyb2xlIjpbInVzZXJfYXBpX3JlYWQiLCJ1c2VyX2FwaV93cml0ZSIsInVzZXJfYXBpX2FkbWluIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZX0.DHmCQbfwUuAOhaUrRSrwMxMQZh3fD0Oakh0NEB2d5Zpi2tas3IzIk1Jav3HZskQaOS5xuw5zQ8Hd-lpBVrMGgA" === token);
//    console.log(token)
//    var settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": `https://api.data.world/v0/datasets/${owner}/${id}`,
//   "method": "PUT",
//   "headers": {
//     "authorization": "Bearer",
//     "content-type": "application/json"
//   },
//   "processData": false,
//   "data": "{\"title\":\"butisit\",\"description\":\"string (optional)\",\"visibility\":\"OPEN\",\"files\":[{\"name\":\""+ name + "\",\"source\":{\"url\":\"https://data.world/"+ owner+"/"+id+"\"}}]}"
// }
//
// $.ajax(settings).done(function (response) {
//   console.log(JSON.stringify(response));
// });




//    const header = {
//      "authorization": "Bearer" + token,
//      "content-type": "application/json"
//    }
//
//    var settings = {
//   "async": true,
//   "crossDomain": true,
//   "processData": false,
//   "data": "{\"title\":\"string (optional)\",\"description\":\"string (optional)\",\"summary\":\"string (optional)\",\"tags\":[\"string\"],\"license\":\"string (optional)\",\"visibility\":\"string (required)\",\"files\":[{\"name\":\"showmesomething.csv\",\"source\":{\"url\":\"\",\"expandArchive\":\"boolean (optional)\"},\"description\":\"string (optional)\",\"labels\":[\"string\"]}]}"
// }
   // console.log(owner,id,name,token);
   // axios.put("https://api.data.world/v0/datasets/" + owner + id, body, headers ).then((response) =>{
   //   console.log("response",response);
   // })
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
     <div className='datasetTable' style={tableStyles}>
     <Table onRowSelection={this.handleRowSelection}  >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Project</TableHeaderColumn>
            <TableHeaderColumn>Size</TableHeaderColumn>
            <TableHeaderColumn>Download</TableHeaderColumn>
            <TableHeaderColumn>Upload</TableHeaderColumn>
            <TableHeaderColumn>Show in Finder</TableHeaderColumn>
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
            <TableRowColumn><RaisedButton onClick={() => require('electron').shell.openExternal('file:///Users/hackreactoratx1/Desktop/dataset.tools/Resources')}>Show in Finder</RaisedButton></TableRowColumn>
//             <TableRowColumn><RaisedButton onClick={() => this.getFile(project.owner, project.id, file.name, this.props.token)}>Upload</RaisedButton></TableRowColumn>
//             <TableRowColumn><RaisedButton onClick={() => require('electron').shell.openExternal('file:///Users/hackreactoratx1/Desktop/dataset.tools/Resources')}>Show</RaisedButton></TableRowColumn>
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
