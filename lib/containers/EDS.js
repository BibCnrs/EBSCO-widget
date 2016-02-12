import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import EDS from '../components/EDS';
import requireAuthentication from './requireAuthentication';
import { routeActions } from 'react-router-redux';

function mapStateToProps(state) {
    return {
        domains: state.domains,
        login: state.login,
        url: state.url,
        limiterShown: state.userInterface.limiterShown,
        limiters: state.search.limiters
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeTerm: actions.changeTerm,
        changeDomain: actions.changeDomain,
        searchTerm: actions.searchTerm,
        forceLogin: actions.forceLogin,
        showLimiter: actions.showLimiter,
        push: routeActions.push
    }, dispatch);
}

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(EDS));
