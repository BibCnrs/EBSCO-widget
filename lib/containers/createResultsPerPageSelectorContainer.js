import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ResultsPerPageSelector from '../components/ResultsPerPageSelector';
import * as fromSearch from '../reducers/search';

const createResultsPerPageSelectorContainer = (category) => {

    function mapStateToProps(state) {
        return {
            resultsPerPage: fromSearch.getSearchValueByName(state.search, category, 'resultsPerPage')
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            changeResultsPerPage: (nbResults) => actions.changeResultsPerPage(category, nbResults)
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(ResultsPerPageSelector);
};

export default createResultsPerPageSelectorContainer;
