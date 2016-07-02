import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

import * as fromState from '../reducers';

function mapStateToProps(state) {
    const { status, token } = fromState.getLogin(state);
    const loginShown = fromState.isLoginShown(state);
    return {
        url: state.url,
        status,
        token,
        loginShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSubmit: actions.apiLogin,
        hideLogin: () => actions.hideLogin()
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
