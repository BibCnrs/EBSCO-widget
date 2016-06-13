import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
    const { currentPage, maxPage } = state.publication.searchResult;
    const { resultsPerPage } = state.publication.search;
    return {
        currentPage,
        maxPage,
        resultsPerPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadPage: actions.publication.loadPage,
        changeResultsPerPage: actions.publication.changeResultsPerPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
