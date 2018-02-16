import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ResultsPerPageSelector from '../components/ResultsPerPageSelector';
import * as fromState from '../selectors';

const createResultsPerPageSelectorContainer = category => {
    function mapStateToProps(state) {
        return {
            resultsPerPage: fromState.getSearchResultsPerPage(state),
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                changeResultsPerPage: nbResults =>
                    actions.changeResultsPerPage(category, nbResults),
            },
            dispatch,
        );
    }

    return connect(mapStateToProps, mapDispatchToProps)(ResultsPerPageSelector);
};

export default createResultsPerPageSelectorContainer;
