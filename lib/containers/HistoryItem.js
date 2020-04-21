import { connect } from 'react-redux';

import actions from '../actions';
import HistoryItem from '../components/HistoryItem';
import * as fromState from '../selectors';

const mapStateToProps = state => ({
    isAlertEnabled: fromState.isAlertEnabled(state),
});

const mapDispatchToProps = {
    reloadHistory: actions.reloadHistory,
    restoreHistory: actions.restoreHistory,
    deleteHistory: actions.deleteHistory,
    saveAlert: actions.saveAlert,
    removeAlert: actions.removeAlert,
    disableAlert: actions.disableAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItem);
