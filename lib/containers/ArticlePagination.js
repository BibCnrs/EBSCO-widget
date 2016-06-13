import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
    const { currentPage, maxPage } = state.article.searchResult;
    const { resultsPerPage } = state.article.search;
    return {
        currentPage,
        maxPage,
        resultsPerPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadPage: actions.article.loadPage,
        changeResultsPerPage: actions.article.changeResultsPerPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
