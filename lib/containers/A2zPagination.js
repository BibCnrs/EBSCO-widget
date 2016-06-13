import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
    const { currentPage, maxPage } = state.a2z.searchResult;
    const { resultsPerPage } = state.a2z.search;

    return {
        currentPage,
        maxPage,
        resultsPerPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadPage: actions.a2z.loadPage,
        changeResultsPerPage: actions.a2z.changeResultsPerPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
