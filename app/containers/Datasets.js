import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Datasets from '../components/Datasets';
import * as DatasetsActions from '../actions/Datasets';
import * as ProjectsActions from '../actions/Projects';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      DatasetsActions: bindActionCreators(DatasetsActions, dispatch),
      ProjectsActions: bindActionCreators(ProjectsActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Datasets);
