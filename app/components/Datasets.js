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
export default class Datasets extends Component {
  constructor(props){
    super(props);
    console.log('props in dataset',props)
    console.log('this.props in dataset',this.props)
  }

 getFile(name) {
   console.log('getting file' + name);
 }

 render() {
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   var tableStyles = {
     height: '500px',
     overflowY: 'auto'
   }
   var clicked = () => {console.log('clicked')}
   return (
     <div className='datasetTable' style={tableStyles}>
     <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>This Won't Show</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Size</TableHeaderColumn>
            <TableHeaderColumn>Download</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { hasUserData.map((project, index) =>
              project.files.map((file, index2) =>


            <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn><RaisedButton onClick={() => {console.log('clicked')}}>Download</RaisedButton></TableRowColumn>
            <TableRowColumn>{(file.sizeInBytes/1000)} kb</TableRowColumn>
            <TableRowColumn><RaisedButton onClick={() => this.getFile(file.name)}>Download</RaisedButton></TableRowColumn>
          </TableRow>
            )
          )}

        </TableBody>
      </Table>
   </div>
   )
 }
}
