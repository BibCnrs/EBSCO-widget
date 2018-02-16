import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleSearchMenu from '../components/ArticleSearchMenu';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    return {
        resultShown: fromState.isResultShown(state),
        historyShown: fromState.isHistoryShown(state),
        hasHistory: fromState.hasHistory(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            showResult: actions.showResult,
            showHistory: actions.showHistory,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearchMenu);
