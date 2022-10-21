import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import compose from 'recompose/compose';

import ProfileButton from '../components/ProfileButton';
import translate from '../higherOrderComponents/translate';

import * as fromState from '../selectors';

const mapStateToProps = state => {
    const { username, favorite_domain, status } = fromState.getProfile(state);
    const domains = fromState.getRights(state);
    const availableDomains = fromState.getAvailableDomains(state);
    const isJanusAccount =
        fromState.isUserLogged(state) && fromState.hasProfile(state);

    return {
        logged: !!state.login.token,
        status,
        username,
        isJanusAccount,
        domains,
        availableDomains,
        favorite_domain,
        isAnimated: fromState.isProfileAnimated(state),
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            changeFavoriteDomaine: actions.changeFavoriteDomaine,
            apiUpdateProfile: actions.apiUpdateProfile,
            logout: actions.logout,
            navigate: actions.navigate,
        },
        dispatch,
    );
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
)(ProfileButton);
