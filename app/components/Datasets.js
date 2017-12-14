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
    console.log('props in dataset',props)
    console.log('this.props in dataset',this.props)
  }
 render() {
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   var tableStyles = {
     height: '500px',
     overflowY: 'auto'
   }
   return (
     <div className='datasetTable' style={tableStyles}>
     <Table onRowSelection={this.handleRowSelection} style="overflow-y:auto">
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
   </div>
   )
 }
}
