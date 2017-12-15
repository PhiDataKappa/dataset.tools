
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Upload from '../components/Upload';
import * as UploadActions from '../actions/Upload';

function mapStateToProps(state) {
  return state;
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(ProjectsActions, dispatch);
// }

export default connect(mapStateToProps)(Projects);
