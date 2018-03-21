import { connect } from 'react-redux';

import actions from '../actions';
import HistoryItem from '../components/HistoryItem';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    reloadHistory: actions.reloadHistory,
    restoreHistory: actions.restoreHistory,
    deleteHistory: actions.deleteHistory,
    saveAlert: actions.saveAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryItem);
