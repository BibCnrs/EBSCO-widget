import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Pagination from '../components/Pagination';
import * as fromState from '../selectors';
import MetadorePagination from '../components/Metadore/MetadorePagination';

const createPaginationContainer = category => {
    function mapStateToProps(state) {
        const { currentPage, maxPage } = fromState.getPaginationData(state);

        return {
            currentPage,
            maxPage,
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                loadPage: (...args) => actions.loadPage(category, ...args),
            },
            dispatch,
        );
    }

    if (category === 'metadore') {
        return connect(mapStateToProps, mapDispatchToProps)(MetadorePagination);
    }
    return connect(mapStateToProps, mapDispatchToProps)(Pagination);
};

export default createPaginationContainer;
