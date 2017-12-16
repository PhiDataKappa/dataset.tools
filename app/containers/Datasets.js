import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Datasets from '../components/Datasets';
import * as DatasetsActions from '../actions/Datasets';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DatasetsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Datasets);
