
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Projects from '../components/Projects';
import * as ProjectsActions from '../actions/Projects';

function mapStateToProps(state) {
  return state;
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ProjectsActions, dispatch);
// }

export default connect(mapStateToProps)(Projects);
