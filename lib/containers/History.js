import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import History from '../components/History';

function mapStateToProps(state) {
    return {
        historyShown: state.userInterface.historyShown,
        queries: state.history
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showHistory: actions.showHistory,
        reloadHistory: actions.reloadHistory
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(History);