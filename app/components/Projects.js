import React, { Component } from 'react';
import {Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export default class Projects extends Component {
  constructor(props){
    super(props);
    console.log('props in projects', props)
    //console.log('this.props in projects', this.props)
  }

  selectProject(row, column, event) {
    console.log('clicked');
    console.log('this')
    console.log(row, column, event);
    console.log(event.target.innerHTML);
    console.log(this.props.userData[row].title, 'title')
    var project = this.props.userData[row].title
    console.log(project, 'project');

    if (column === 2) {
      console.log('switching to dataset view');
      this.props.actions.ProjectsActions.setSelectedProject(row);
      this.props.actions.MainPageActions.changeView('Datasets');
      //change view
    }

  }
 render() {
   var hasUserData = Array.isArray(this.props.userData) ? this.props.userData : [];
   return (
     <div className='projectTable'>
     <Table onRowSelection={this.handleRowSelection} onCellClick={this.selectProject.bind(this)}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Number of Files</TableHeaderColumn>
            <TableHeaderColumn>Show Datasets</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          { hasUserData.map((project, index) =>
            <TableRow>
            <TableRowColumn>{project.title}</TableRowColumn>
            <TableRowColumn>{(project.files.length)} Files</TableRowColumn>
            <TableRowColumn><RaisedButton>Show</RaisedButton></TableRowColumn>
          </TableRow>
            )
          }

        </TableBody>
      </Table>
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
