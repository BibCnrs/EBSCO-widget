import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const { status, token, username, password, mode } = fromState.getLogin(
        state,
    );
    const loginShown = fromState.isLoginShown(state);
    return {
        status,
        token,
        username,
        password,
        mode,
        loginShown,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeUsername: actions.changeUsername,
            changePassword: actions.changePassword,
            changeMode: actions.changeAuthenticationMode,
            onSubmit: actions.apiLogin,
            loginRenater: actions.loginRenater,
            hideLogin: () => actions.hideLogin(),
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
