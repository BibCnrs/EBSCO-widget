'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import App from '../components/App';

function mapStateToProps(state, ownProps) {
    return {
        term: ownProps.term,
        login: state.login,
        url: ownProps.url,
        token: ownProps.token || state.login.get('token'),
        limiterShown: state.limiters.get('limiterShown'),
        limiters: state.limiters.toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTerm: actions.changeTerm,
        search: actions.search,
        forceLogin: actions.forceLogin,
        showLimiter: actions.showLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
