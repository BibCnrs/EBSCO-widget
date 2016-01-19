import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';

function mapStateToProps(state) {
    const { currentPage, maxPage } = state.searchResult;
    return {
        currentPage,
        maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadPage: actions.loadPage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
