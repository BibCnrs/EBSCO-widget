import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import History from '../components/History';

function mapStateToProps(state) {
    return {
        historyShown: state.userInterface.historyShown,
        queries: state.article.history
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
