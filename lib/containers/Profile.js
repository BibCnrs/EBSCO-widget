import { connect } from 'react-redux';
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

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
