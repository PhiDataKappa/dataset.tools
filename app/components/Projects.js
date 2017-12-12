import React, { Component } from 'react';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
export default class Projects extends Component {
  constructor(props){
    super(props);
    console.log('props in dataset', props)
    console.log('this.props in dataset', this.props)
  }
 render() {
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   return (
     <div className='projectTable'>
     <Table onRowSelection={this.handleRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>This Won't Show</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Number of Files</TableHeaderColumn>
            <TableHeaderColumn>Download</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { hasUserData.map((project, index) =>
            <TableRow>
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>{project.title}</TableRowColumn>
            <TableRowColumn>{(project.files.length)} Files</TableRowColumn>
            <TableRowColumn>Download</TableRowColumn>
          </TableRow>
            )
          }

        </TableBody>
      </Table>
     <p>Hi im in projects</p>
   </div>
   )
 }
}











/*
export const Projects = props => {
  return (
    <div>
      <p>  projects-------------------!! </p>
    </div>
  )
}
*/
