import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ResultsPerPageSelector from '../components/ResultsPerPageSelector';

function mapStateToProps(state) {
    const { resultsPerPage } = state.publication.search;

    return {
        resultsPerPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeResultsPerPage: actions.publication.changeResultsPerPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPerPageSelector);
