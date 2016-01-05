import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import App from '../components/App';

function mapStateToProps(state, ownProps) {
    return {
        open: state.open,
        term: ownProps.term,
        domain: ownProps.domain,
        domains: state.domains,
        login: state.login,
        url: state.url,
        token: state.login.get('token'),
        limiterShown: state.search.get('limiters').get('limiterShown'),
        limiters: state.search.get('limiters').toJS()
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onOpenSearch: actions.openSearch,
        changeTerm: actions.changeTerm,
        changeDomain: actions.changeDomain,
        searchTerm: actions.searchTerm,
        forceLogin: actions.forceLogin,
        showLimiter: actions.showLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
