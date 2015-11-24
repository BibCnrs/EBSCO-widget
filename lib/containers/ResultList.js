import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ResultList from '../components/ResultList';

function mapStateToProps(state, ownProps) {
    return {
        url: ownProps.url,
        results: state.results
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);
