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

 componentWillUnmount() {
   
 }

 showDatasetInfo(row, column, event) {
   console.log('clicked');
   console.log('this')
   console.log(row, column, event);
   console.log(event.target.innerHTML);
   var dataset = event.target.innerHTML;
   console.log(dataset);
   if (column === 0) {
     this.props.setSelectedDataset(dataset);
   }
 }

 getFile(owner, id, name, token) {
   console.log('getting file' + name);
   axios.get('http://localhost:8080/downloadDatasets', {params: {owner: owner, projectID: id, file: name, at: token}})
   .then((response) => {
     console.log('this is data in getFile', response);
     var path = (String(process.cwd()).split('/'));
     path.pop()
     var path = (String(path.join('/') + `/${name}`))
     console.log('path',path)
     fs.writeFileSync(path, response.data, "utf8", (err) => {
       if (err) throw err;
       console.log("The file was succesfully saved!");
     });
   })
 }

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
