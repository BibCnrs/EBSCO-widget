import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ResultsPerPageSelector from '../components/ResultsPerPageSelector';

function mapStateToProps(state) {
    const { resultsPerPage } = state.a2z.search;

    return {
        resultsPerPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeResultsPerPage: actions.a2z.changeResultsPerPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPerPageSelector);
