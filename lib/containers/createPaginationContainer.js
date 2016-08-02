import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';
import * as fromState from '../reducers';

const createPaginationContainer = (category) => {
    function mapStateToProps(state) {
        const { currentPage, maxPage } = fromState.getPaginationData(state);

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

export default createPaginationContainer;
