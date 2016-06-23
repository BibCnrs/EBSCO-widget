import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';
import * as fromSearchResult from '../reducers/searchResult';

const createPagination = (category) => {
    function mapStateToProps(state) {
        const { currentPage, maxPage } = fromSearchResult.getPaginationData(state.searchResult, category);

        return {
            currentPage,
            maxPage
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            loadPage: (...args) => actions.loadPage(category, ...args)
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(Pagination);
};

export default createPagination;
