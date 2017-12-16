import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
var fs = require('fs');
export default class Datasets extends Component {
  constructor(props){
    super(props);
    console.log('props in dataset',props);
    console.log('this.props in dataset',this.props);
  }

 componentDidMount() {
   console.log('mounting Datasets');
   this.props.setSelectedDataset(null);
 }

 showDatasetInfo(row, column, event) {
   console.log('clicked');
   console.log('this')
   console.log(row, column, event);
   console.log(event.target.innerHTML);
   var dataset = event.target.innerHTML;
   console.log(dataset);
   if (column === 1) {
     this.props.setSelectedDataset(dataset);
   }
 }

 getFile(owner, id, name, token) {
   console.log('getting file' + name);
   axios.get('http://localhost:8080/downloadDatasets', {params: {owner: owner, projectID: id, file: name, at: token}})
   .then((data) => {
     console.log('this is data in getFile', data);
     //this.props.actions.mainPageActions.addUserData(data.data.records);
     //-------Added---------------
     // Change the content of the file as you want
     // or either set fileContent to null to create an empty file
     var fileContent = JSON.stringify(data);

     // The absolute path of the new file with its name
     var filepath = "mynewfile.csv";
     var path = (String(process.cwd()).split('/'));
     console.log('path after split',path)
     path.pop()
      var path = (String(path.join('/') + `/${name}`))
     console.log('path',path)
     fs.writeFileSync(path ,fileContent,(err) => {
       if (err) throw err;
       console.log("The file was succesfully saved!");
   });




     // fs.writeFile(filepath, fileContent, (err) => {
     //     if (err) throw err;
     //
     //     console.log("The file was succesfully saved!");
     // });
     //-------Added---------------
   })
 }

 render() {
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   var tableStyles = {
     height: '500px',
     overflowY: 'auto'
   }
   var clicked = () => {console.log('clicked')}
   var showDatasetInfo = function () {
     var curDataset = this.props.selectedDataset  || false;
     if (curDataset){
       return <div><p>!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</p></div>;
     } else {
       return <div><p>??????????????????????????????????????????????????????????????????</p></div>;
     }
     //return <div><p>??????????????????????????????????????????????????????????????????</p></div>
   }
   //onCellClick={console.log(rowNumber, columnID, 'clicked')}
   return (
     <div>
     <div className='datasetTable' style={tableStyles}>
     <Table onRowSelection={this.handleRowSelection} onCellClick={this.showDatasetInfo.bind(this)} >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>This Won't Show</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Project</TableHeaderColumn>
            <TableHeaderColumn>Size</TableHeaderColumn>
            <TableHeaderColumn>Download</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { hasUserData.map((project, index) =>
              project.files.map((file, index2) =>
            <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>{file.name}</TableRowColumn>
            <TableRowColumn>{project.title}</TableRowColumn>
            <TableRowColumn>{(file.sizeInBytes/1000)} kb</TableRowColumn>
            <TableRowColumn><RaisedButton onClick={() => this.getFile(project.owner, project.id, file.name, this.props.token)}>Download</RaisedButton></TableRowColumn>
          </TableRow>
            )
          )}

        </TableBody>
      </Table>
   </div>
   {showDatasetInfo.call(this)}
 </div>
   )
 }
}
