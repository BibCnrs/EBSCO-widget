'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import App from '../components/App';

function mapStateToProps(state, ownProps) {
    return {
        open: state.open,
        term: ownProps.term,
        login: state.login,
        url: state.url,
        token: state.login.get('token'),
        limiterShown: state.limiters.get('limiterShown'),
        limiters: state.limiters.toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onOpenSearch: actions.openSearch,
        changeTerm: actions.changeTerm,
        searchTerm: actions.searchTerm,
        forceLogin: actions.forceLogin,
        showLimiter: actions.showLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
