import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import History from '../components/History';
import { availableFields } from '../config/article';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const canPersistHistoryOnServer = fromState.canPersistHistoryOnServer(state);
    return {
        canPersistHistoryOnServer,
        historyShown: fromState.isHistoryShown(state),
        queries: state.history.queries,
        currentPage: state.history.currentPage,
        maxPage: state.history.maxPage,
        availableFields,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showHistory: actions.showHistory,
        reloadHistory: actions.reloadHistory,
        restoreHistory: actions.restoreHistory,
        deleteHistory: actions.deleteHistory,
        loadPage: actions.loadHistoryPage,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
