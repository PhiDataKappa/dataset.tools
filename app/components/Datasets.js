import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
export default class Datasets extends Component {
  constructor(props){
    super(props);
    console.log(props, 'props in dataset')
    console.log(this.props, 'this.props in dataset')
  }
 render() {
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   return (
     <div className='datasetTable'>
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
            <TableRowColumn>{file.name}</TableRowColumn>
            <TableRowColumn>{(file.sizeInBytes/1000)} kb</TableRowColumn>
            <TableRowColumn>Download</TableRowColumn>
          </TableRow>
            )
          )}

        </TableBody>
      </Table>
     <p>Hi im in Datasets</p>
   </div>
   )
 }
}
