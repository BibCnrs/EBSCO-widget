import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Profile from '../components/Profile';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const { username, favorite_domain, status } = fromState.getProfile(state);
    const domains = fromState.getAvailableDomains(state);
    const invalidFavoriteDomainShown = !fromState.hasAccessToFavoriteDomain(
        state,
    );

    return {
        domains,
        favorite_domain,
        invalidFavoriteDomainShown,
        status,
        username,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeFavoriteDomaine: actions.changeFavoriteDomaine,
            apiUpdateProfile: actions.apiUpdateProfile,
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
