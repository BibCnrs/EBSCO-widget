import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleSearchMenu from '../components/ArticleSearchMenu';

function mapStateToProps(state) {
    return {
        resultShown: state.userInterface.resultShown,
        historyShown: state.userInterface.historyShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showResult: actions.showResult,
        showHistory: actions.showHistory
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearchMenu);
