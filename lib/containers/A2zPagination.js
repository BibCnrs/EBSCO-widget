import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const { currentPage, maxPage } = fromSearchResult.getPaginationData(state.searchResult, 'a2z');

    return {
        currentPage,
        maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadPage: actions.a2z.loadPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
