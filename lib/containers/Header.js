import { connect } from 'react-redux';
import compose from 'recompose/compose';

import actions from '../actions';
import Header from '../components/Header';
import translate from '../higherOrderComponents/translate';

import * as fromState from '../selectors';

const mapStateToProps = state => ({
    logged: !!state.login.token,
    username: fromState.getUserName(state),
    availableDomains: fromState.getAvailableDomains(state),
    showProfileButton: fromState.hasProfile(state),
});

const mapDispatchToProps = {
    logout: actions.logout,
    showLogin: actions.showLogin,
    showProfile: actions.showProfile,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), translate)(
    Header,
);
