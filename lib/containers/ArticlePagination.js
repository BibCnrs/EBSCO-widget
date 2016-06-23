import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const { currentPage, maxPage } = fromSearchResult.getPaginationData(state.searchResult, 'article');

    return {
        currentPage,
        maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadPage: actions.article.loadPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
