import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
    const { currentPage, targetPage, maxPage } = state.searchResult.toJS();
    return {
        currentPage,
        targetPage,
        maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changePage: actions.changePage,
        loadPage: actions.loadPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
