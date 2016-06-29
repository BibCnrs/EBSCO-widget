import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import History from '../components/History';
import { availableFields } from '../config/article';

function mapStateToProps(state) {
    return {
        historyShown: state.userInterface.historyShown,
        queries: state.history,
        availableFields
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showHistory: actions.showHistory,
        reloadHistory: actions.reloadHistory,
        restoreHistory: actions.restoreHistory,
        deleteHistory: actions.deleteHistory
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
