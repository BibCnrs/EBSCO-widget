import { connect } from 'react-redux';
import compose from 'recompose/compose';

import actions from '../actions';
import ProfileButton from '../components/ProfileButton';
import translate from '../higherOrderComponents/translate';

import * as fromState from '../selectors';

const mapStateToProps = state => ({
    logged: !!state.login.token,
    username: fromState.getUserName(state),
    showProfileButton: fromState.hasProfile(state),
    isAnimated: fromState.isProfileAnimated(state),
});

const mapDispatchToProps = {
    showProfile: actions.showProfile,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), translate)(
    ProfileButton,
);