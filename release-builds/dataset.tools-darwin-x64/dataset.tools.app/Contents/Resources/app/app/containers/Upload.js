
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Upload from '../components/Upload';
import * as UploadActions from '../actions/Upload';

function mapStateToProps(state) {
  return {
    upload: state.upload
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UploadActions, dispatch);
}

export default connect(mapStateToProps)(Upload);
