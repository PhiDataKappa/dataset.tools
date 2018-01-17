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
     <div className='table'>
     <Table onRowSelection={this.handleRowSelection} onCellClick={this.selectProject.bind(this)}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow className="row">
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Number of Files</TableHeaderColumn>
            <TableHeaderColumn style={{color: "black", fontWeight:"bold"}}>Show Datasets</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { hasUserData.map((project, index) =>
            <TableRow className="row">
            <TableRowColumn style={{color: "black"}}>{project.title}</TableRowColumn>
            <TableRowColumn style={{color: "black"}}>{(project.files.length)} Files</TableRowColumn>
            <TableRowColumn><RaisedButton backgroundColor="#5dc0de">Show</RaisedButton></TableRowColumn>
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
