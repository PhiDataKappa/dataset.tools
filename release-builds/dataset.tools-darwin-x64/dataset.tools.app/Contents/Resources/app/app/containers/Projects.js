
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Projects from '../components/Projects';
import * as ProjectsActions from '../actions/Projects';
import * as MainPageActions from '../actions/mainpage';



function mapStateToProps(state) {
  return state;
}
/*
 function mapDispatchToProps(dispatch) {
   return bindActionCreators(ProjectsActions, dispatch);
 }
 */

 function mapDispatchToProps(dispatch) {
   return {
     actions: {
       ProjectsActions: bindActionCreators(ProjectsActions, dispatch),
       MainPageActions: bindActionCreators(MainPageActions, dispatch)
     }
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
