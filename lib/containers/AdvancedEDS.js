import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import actions from '../actions';
import AdvancedEDS from '../components/AdvancedEDS';
import requireAuthentication from './requireAuthentication';

function mapStateToProps(state) {
    return {
        open: state.userInterface.open,
        domains: state.domains,
        login: state.login,
        url: state.url,
        limiterShown: state.userInterface.limiterShown,
        limiters: state.search.limiters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onOpenSearch: actions.openSearch,
        changeTerm: actions.changeTerm,
        changeDomain: actions.changeDomain,
        searchTerm: actions.searchTerm,
        forceLogin: actions.forceLogin,
        showLimiter: actions.showLimiter,
        push: routeActions.push
    }, dispatch);
}

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(AdvancedEDS));
